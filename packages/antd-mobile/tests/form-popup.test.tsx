import type { FormPopupContentProps } from '../src'
import { useForm } from '@silver-formily/react'
import { useState } from 'react'
import { expect, expectTypeOf, it, vi } from 'vitest'
import { FormPopup } from '../src'

async function cleaned() {
  await vi.waitFor(() => expect(document.querySelectorAll('.adm-formily-form-popup-root')).toHaveLength(0))
}

function setup() {
  const history: FormPopupContentProps<{ name: string }>[] = []
  const popup = FormPopup<{ name: string }>('编辑', (props) => {
    const form = useForm()
    const [label] = useState('内容')
    expect(form).toBe(props.form)
    if (!history.some(item => item.form === props.form))
      history.push(props)
    return <span>{label}</span>
  })
  return { popup, bindings: () => history.at(-1)! }
}

it('provides form context, validates, prevents duplicate submission and reopens with fresh values', async () => {
  const { popup, bindings } = setup()
  const confirm = vi.fn(async (form, next) => next(form))
  popup.forConfirm(confirm)
  popup.forOpen((props, next) => next({ ...props, initialValues: { name: props.initialValues?.name === 'first' ? 'from middleware' : props.initialValues?.name ?? '' } }))
  const initial = { initialValues: { name: 'first' } }
  const first = popup.open(initial)
  expect(popup.open({ initialValues: { name: 'ignored' } })).toBe(first)
  await vi.waitFor(() => expect(bindings()).toBeDefined())
  const old = bindings()
  expect(old.form.values.name).toBe('from middleware')
  const field = old.form.createField({ name: 'name', required: true })!
  field.setValue('')
  old.resolve()
  await vi.waitFor(() => expect(old.form.errors).toHaveLength(1))
  await new Promise(resolve => setTimeout(resolve, 0))
  expect(confirm).not.toHaveBeenCalled()
  expect(document.querySelector('.adm-formily-form-popup-root')).not.toBeNull()
  field.setValue('edited')
  old.resolve()
  old.resolve()
  await expect(first).resolves.toEqual({ name: 'edited' })
  expect(initial.initialValues.name).toBe('first')
  expect(confirm).toHaveBeenCalledOnce()
  const second = popup.open({ initialValues: { name: 'second' } })
  await vi.waitFor(() => expect(bindings().form).not.toBe(old.form))
  old.reject()
  old.resolve()
  expect(bindings().form.values.name).toBe('second')
  bindings().resolve()
  await expect(second).resolves.toEqual({ name: 'second' })
  await cleaned()
})

it('uses default buttons and cleans up after animated close', async () => {
  const afterClose = vi.fn()
  const popup = FormPopup({ title: '确认', afterClose }, <span>表单内容</span>)
  const result = popup.open({ initialValues: { count: 2 } })
  await vi.waitFor(() => expect(document.querySelector('.adm-formily-form-popup-footer button')).not.toBeNull())
  const buttons = document.querySelectorAll<HTMLButtonElement>('.adm-formily-form-popup-footer button')
  buttons[1]!.click()
  await expect(result).resolves.toEqual({ count: 2 })
  await cleaned()
  expect(afterClose).toHaveBeenCalledOnce()
})

it.each(['cancel', 'close', 'mask'] as const)('rejects on %s and runs cancellation middleware once', async (action) => {
  let bindings!: FormPopupContentProps
  const cancelled = vi.fn()
  const popup = FormPopup({ closeOnMaskClick: true }, (props) => {
    bindings = props
    return null
  }).forCancel(cancelled)
  const promise = popup.open().catch(error => error)
  await vi.waitFor(() => expect(bindings).toBeDefined())
  if (action === 'cancel')
    document.querySelector<HTMLButtonElement>('.adm-formily-form-popup-footer button')!.click()
  else if (action === 'mask')
    document.querySelector<HTMLButtonElement>('.adm-mask')!.click()
  else
    popup.close()
  popup.close()
  expect(await promise).toEqual(new Error('cancel'))
  expect(cancelled).toHaveBeenCalledOnce()
  await cleaned()
})

it('cancels while open middleware is pending without mounting late content', async () => {
  let release!: () => void
  const popup = FormPopup('加载').forOpen(async (props) => {
    await new Promise<void>((resolve) => {
      release = resolve
    })
    return props
  })
  const result = popup.open().catch(error => error)
  popup.close()
  expect(await result).toEqual(new Error('cancel'))
  release()
  await new Promise(resolve => setTimeout(resolve, 50))
  await cleaned()
})

it('propagates open and confirm failures and supports middleware return values', async () => {
  const error = new Error('middleware failed')
  const failed = FormPopup('失败').forOpen(() => {
    throw error
  })
  await expect(failed.open()).rejects.toBe(error)
  await cleaned()
  const { popup, bindings } = setup()
  popup.forConfirm(() => {
    throw error
  })
  const result = popup.open().catch(error => error)
  await vi.waitFor(() => expect(bindings()).toBeDefined())
  bindings().resolve()
  expect(await result).toBe(error)
  await cleaned()
  let resolve!: () => void
  const transformed = FormPopup('转换', (props) => {
    resolve = props.resolve
    return null
  }).forConfirm(() => 'saved')
  const saved = transformed.open()
  await vi.waitFor(() => expect(resolve).toBeDefined())
  resolve()
  await expect(saved).resolves.toBe('saved')
  await cleaned()
})

it('supports custom header/footer and typed dynamic middleware', async () => {
  const save = vi.fn((form) => {
    form.setValues({ status: 'draft' })
    return 'ignored'
  })
  const popup = FormPopup({ title: 'hidden' }, {
    header: ({ form }) => <span>{form.values.status}</span>,
    default: () => <span>body</span>,
    footer: ({ saveDraft }) => <button type="button" onClick={saveDraft}>保存草稿</button>,
  }, ['save-draft']).forSaveDraft(save)
  const result = popup.open({ initialValues: { status: 'new' } })
  await vi.waitFor(() => expect(document.querySelector('.adm-formily-form-popup-header')?.textContent).toBe('new'))
  document.querySelector<HTMLButtonElement>('.adm-formily-form-popup-footer button')!.click()
  await expect(result).resolves.toEqual({ status: 'draft' })
  expect(save).toHaveBeenCalledOnce()
  await cleaned()
  for (const name of ['open', 'confirm', 'cancel', 'form', 'resolve', 'reject'])
    expect(() => FormPopup('保留名称', undefined, [name])).toThrow('preserved')
})

it('exports typed values and reserves popup visibility', () => {
  if (false) {
    FormPopup<{ name: string }>('类型', ({ form }) => {
      expectTypeOf(form.values.name).toEqualTypeOf<string>()
      return null
    })
    // @ts-expect-error visibility is owned by FormPopup
    FormPopup({ visible: true })
    // @ts-expect-error unregistered middleware is not available
    FormPopup('test').forSaveDraft(() => {})
  }
})

it('keeps the popup locked and shows loading during asynchronous submission', async () => {
  const { popup, bindings } = setup()
  let release!: () => void
  const middleware = vi.fn(async () => {
    await new Promise<void>((resolve) => {
      release = resolve
    })
  })
  popup.forConfirm(middleware)
  const result = popup.open({ initialValues: { name: 'saved' } })
  await vi.waitFor(() => expect(bindings()).toBeDefined())
  // The default mask behavior keeps the form open.
  document.querySelector<HTMLButtonElement>('.adm-mask')!.click()
  bindings().resolve()
  await vi.waitFor(() => expect(document.querySelector<HTMLButtonElement>('.adm-formily-form-popup-footer button')!.disabled).toBe(true))
  expect(document.querySelector('.adm-formily-form-popup-footer .adm-loading')).not.toBeNull()
  bindings().resolve()
  popup.close()
  release()
  await expect(result).resolves.toEqual({ name: 'saved' })
  expect(middleware).toHaveBeenCalledOnce()
  await cleaned()
})

it.each(['success', 'failure', 'close'] as const)('cleans up open Loading on %s and prevents late mounting', async (outcome) => {
  let finish!: () => void
  let fail!: (error: Error) => void
  const request = new Promise<void>((resolve, reject) => {
    finish = resolve
    fail = reject
  })
  const popup = FormPopup({ title: '异步表单', loadingText: '正在读取数据' })
    .forOpen(async () => {
      await request
      return { initialValues: { name: 'loaded' } }
    })
  const result = popup.open().catch(error => error)
  await vi.waitFor(() => {
    expect(document.querySelector('.adm-formily-form-popup-loading')?.textContent).toContain('正在读取数据')
  })
  expect(document.querySelector('.adm-formily-form-popup-root')).toBeNull()
  if (outcome === 'success') {
    finish()
    await vi.waitFor(() => expect(document.querySelector('.adm-formily-form-popup-root')).not.toBeNull())
    document.querySelector<HTMLButtonElement>('.adm-formily-form-popup-footer button:last-child')!.click()
    await expect(result).resolves.toEqual({ name: 'loaded' })
  }
  else if (outcome === 'failure') {
    fail(new Error('load failed'))
    await expect(result).resolves.toMatchObject({ message: 'load failed' })
  }
  else {
    popup.close()
    await expect(result).resolves.toMatchObject({ message: 'cancel' })
    finish()
    await new Promise(resolve => setTimeout(resolve, 0))
  }
  await vi.waitFor(() => {
    const toast = document.querySelector<HTMLElement>('.adm-formily-form-popup-loading')
    expect(!toast || getComputedStyle(toast).display === 'none').toBe(true)
    expect(document.querySelector('.adm-formily-form-popup-root')).toBeNull()
  })
})

it('does not flash open Loading for fast middleware', async () => {
  const popup = FormPopup({ loadingText: '不应出现的加载提示' }).forOpen(async props => props)
  const result = popup.open().catch(error => error)
  await vi.waitFor(() => expect(document.querySelector('.adm-formily-form-popup-root')).not.toBeNull())
  popup.close()
  await result
  await new Promise(resolve => setTimeout(resolve, 150))
  expect(document.body.textContent).not.toContain('不应出现的加载提示')
})
