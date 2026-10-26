import type { PopupContentCallbacks, PopupOptions } from '../src/create-popup'
import { useState } from 'react'
import { expect, expectTypeOf, it, vi } from 'vitest'
import { createPopup } from '../src/create-popup'

interface ContentProps extends PopupContentCallbacks<string> {
  label: string
}

function setup(options: PopupOptions = {}) {
  let content!: ContentProps
  const history: ContentProps[] = []
  function Content(props: ContentProps) {
    content = props
    history.push(props)
    return <span>{props.label}</span>
  }
  const afterShow = vi.fn()
  const afterClose = vi.fn()
  const popup = createPopup(Content, { afterShow, afterClose, ...options })
  return { popup, history, afterShow, afterClose, content: () => content }
}

async function cleaned() {
  await vi.waitFor(() => expect(document.querySelectorAll('.adm-formily-popup-root')).toHaveLength(0))
}

it('infers results, preserves required props and reserves runtime options', () => {
  function Content(_props: ContentProps) {
    return null
  }
  const popup = createPopup(Content)
  expectTypeOf<ReturnType<typeof popup.prompt>>().toEqualTypeOf<Promise<string | null>>()
  expectTypeOf<Parameters<typeof popup.prompt>[0]['label']>().toEqualTypeOf<string>()
  // These calls are checked by tsc but never executed.
  if (false) {
    // @ts-expect-error label is required
    popup.prompt({})
    // @ts-expect-error no getter API
    popup.prompt(() => ({ label: 'test' }))
    // @ts-expect-error visible is managed by the factory
    createPopup(Content, { visible: true })
    // @ts-expect-error null is reserved for cancellation
    const callbacks: PopupContentCallbacks<string> = { onConfirm: (value: null) => value, onCancel() {} }
    void callbacks
  }
  expect(document.querySelector('.adm-formily-popup-root')).toBeNull()
})

it('reuses the active promise and ignores replacement props and observers', async () => {
  const { popup, content, afterShow } = setup()
  const calls: string[] = []
  const ignored = vi.fn()
  const first = popup.prompt({ label: 'first', onConfirm: value => calls.push(value), onClose: () => calls.push('close') })
  expect(popup.prompt({ label: 'ignored', onConfirm: ignored })).toBe(first)
  expect(content().label).toBe('first')
  await vi.waitFor(() => expect(afterShow).toHaveBeenCalledOnce())
  content().onConfirm('result')
  content().onConfirm('duplicate')
  await expect(first).resolves.toBe('result')
  expect(calls).toEqual(['result', 'close'])
  expect(ignored).not.toHaveBeenCalled()
  await cleaned()
})

it('distinguishes content cancellation from programmatic close', async () => {
  const { popup, content } = setup()
  const calls: string[] = []
  popup.close()
  const first = popup.prompt({ label: 'cancel', onCancel: () => calls.push('cancel'), onClose: () => calls.push('close') })
  content().onCancel()
  popup.close()
  await expect(first).resolves.toBeNull()
  expect(calls).toEqual(['cancel', 'close'])
  await cleaned()
  calls.length = 0
  const second = popup.prompt({ label: 'close', onCancel: () => calls.push('cancel'), onClose: () => calls.push('close') })
  popup.close()
  popup.close()
  await expect(second).resolves.toBeNull()
  expect(calls).toEqual(['close'])
  await cleaned()
})

it.each([true, false])('handles mask clicks with closeOnMaskClick=%s', async (closeOnMaskClick) => {
  const { popup, afterShow } = setup({ closeOnMaskClick })
  const onCancel = vi.fn()
  const result = popup.prompt({ label: 'mask', onCancel })
  await vi.waitFor(() => expect(afterShow).toHaveBeenCalledOnce())
  document.querySelector<HTMLElement>('.adm-mask')!.click()
  if (closeOnMaskClick) {
    await expect(result).resolves.toBeNull()
    expect(onCancel).toHaveBeenCalledOnce()
  }
  else {
    expect(onCancel).not.toHaveBeenCalled()
    expect(popup.prompt({ label: 'still active' })).toBe(result)
    popup.close()
    await expect(result).resolves.toBeNull()
  }
  await cleaned()
})

it('isolates closing instances and stale callbacks from a newly opened session', async () => {
  const { popup, content, afterShow, afterClose } = setup({ bodyClassName: 'popup-animation-test' })
  const first = popup.prompt({ label: 'first' })
  const body = document.querySelector<HTMLElement>('.popup-animation-test')!
  expect(body.style.transform).toBe('translate(0px, 100%)')
  await vi.waitFor(() => expect(afterShow).toHaveBeenCalledOnce())
  const old = content()
  old.onConfirm('first')
  await expect(first).resolves.toBe('first')
  expect(body.isConnected).toBe(true)
  const second = popup.prompt({ label: 'second' })
  old.onCancel()
  old.onConfirm('stale')
  await vi.waitFor(() => expect(afterClose).toHaveBeenCalledOnce())
  expect(body.isConnected).toBe(false)
  expect(document.querySelectorAll('.adm-formily-popup-root')).toHaveLength(1)
  expect(popup.prompt({ label: 'ignored' })).toBe(second)
  content().onConfirm('second')
  await expect(second).resolves.toBe('second')
  await cleaned()
})

it('settles and cleans up even when an observer throws', async () => {
  const { popup, content } = setup()
  const error = new Error('observer failed')
  const onClose = vi.fn()
  const result = popup.prompt({ label: 'throw', onConfirm: () => {
    throw error
  }, onClose })
  expect(() => content().onConfirm('result')).toThrow(error)
  await expect(result).resolves.toBe('result')
  expect(onClose).toHaveBeenCalledOnce()
  await cleaned()
})

it('initializes fresh content state for each session', async () => {
  function Content({ label, onConfirm }: ContentProps) {
    const [draft] = useState(label)
    return <button type="button" onClick={() => onConfirm(draft)}>Confirm draft</button>
  }
  const afterShow = vi.fn()
  const popup = createPopup(Content, { afterShow })
  for (const [index, label] of ['first draft', 'second draft'].entries()) {
    const result = popup.prompt({ label })
    await vi.waitFor(() => expect(afterShow).toHaveBeenCalledTimes(index + 1))
    document.querySelector<HTMLButtonElement>('.adm-formily-popup-content button')!.click()
    await expect(result).resolves.toBe(label)
    await cleaned()
  }
})
