import type { ButtonRef } from 'antd-mobile/es/components/button'
import { createForm } from '@silver-formily/core'
import { FormProvider } from '@silver-formily/react'
import { createRef } from 'react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { FormButtonGroup, Submit } from '../src'

afterEach(cleanup)

it('submits values and forwards the result and button ref', async () => {
  const form = createForm({ initialValues: { username: '张三' } })
  const onSubmit = vi.fn(() => 'done')
  const success = vi.fn()
  const ref = createRef<ButtonRef>()
  const { getByRole } = await render(
    <FormProvider form={form}><Submit ref={ref} onSubmit={onSubmit} onSubmitSuccess={success} /></FormProvider>,
  )
  expect(ref.current?.nativeElement?.type).toBe('button')
  await getByRole('button', { name: '提交' }).click()
  await vi.waitFor(() => expect(success).toHaveBeenCalledWith('done'))
  expect(onSubmit).toHaveBeenCalledWith({ username: '张三' })
})

it('keeps submitting loading even with loading=false and blocks repeated clicks', async () => {
  let resolve!: (value: string) => void
  const onSubmit = vi.fn(() => new Promise<string>((done) => {
    resolve = done
  }))
  const success = vi.fn()
  const { container } = await render(
    <FormProvider form={createForm()}><Submit loading={false} onSubmit={onSubmit} onSubmitSuccess={success} /></FormProvider>,
  )
  const button = container.querySelector('button')!
  button.click()
  button.click()
  await vi.waitFor(() => expect(button.disabled).toBe(true))
  expect(onSubmit).toHaveBeenCalledOnce()
  resolve('ok')
  await vi.waitFor(() => expect(button.disabled).toBe(false))
  expect(success).toHaveBeenCalledWith('ok')
})

it('reports validation failure without invoking the submit callback', async () => {
  const form = createForm()
  form.createField({ name: 'required', required: true })
  const onSubmit = vi.fn()
  const failed = vi.fn()
  const { getByRole } = await render(
    <FormProvider form={form}><Submit onSubmit={onSubmit} onSubmitFailed={failed} /></FormProvider>,
  )
  await getByRole('button').click()
  await vi.waitFor(() => expect(failed).toHaveBeenCalledOnce())
  expect(onSubmit).not.toHaveBeenCalled()
})

it('reports async rejection and restores the button', async () => {
  const error = new Error('submit failed')
  const failed = vi.fn()
  const { getByRole, container } = await render(
    <FormProvider form={createForm()}><Submit onSubmit={async () => { throw error }} onSubmitFailed={failed} /></FormProvider>,
  )
  await getByRole('button').click()
  await vi.waitFor(() => expect(failed).toHaveBeenCalledWith(error))
  await vi.waitFor(() => expect(container.querySelector('button')!.disabled).toBe(false))
})

it.each(['return-false', 'prevent-default'] as const)('cancels native and programmatic submissions via %s', async (mode) => {
  const nativeSubmit = vi.fn()
  const onSubmit = vi.fn()
  const cancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (mode === 'return-false')
      return false
    event.preventDefault()
  }
  const { getByRole } = await render(
    <FormProvider form={createForm()}>
      <form onSubmit={(event) => {
        event.preventDefault()
        nativeSubmit()
      }}
      >
        <Submit onClick={cancel}>原生</Submit>
        <Submit onClick={cancel} onSubmit={onSubmit}>程序</Submit>
      </form>
    </FormProvider>,
  )
  await getByRole('button', { name: '原生' }).click()
  await getByRole('button', { name: '程序' }).click()
  expect(nativeSubmit).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

it('preserves native submission in compact and makes submit=true opt out', async () => {
  const nativeSubmit = vi.fn()
  const { getByRole } = await render(
    <FormProvider form={createForm()}>
      <form onSubmit={(event) => {
        event.preventDefault()
        nativeSubmit()
      }}
      >
        <FormButtonGroup layout="compact">
          <Submit>原生</Submit>
          <Submit submit>仅点击</Submit>
        </FormButtonGroup>
      </form>
    </FormProvider>,
  )
  await getByRole('button', { name: '原生' }).click()
  expect(nativeSubmit).toHaveBeenCalledOnce()
  await getByRole('button', { name: '仅点击' }).click()
  expect(nativeSubmit).toHaveBeenCalledOnce()
})

it('honors explicit loading and disabled', async () => {
  const click = vi.fn()
  const { container } = await render(
    <FormProvider form={createForm()}>
      <Submit loading onClick={click} />
      <Submit disabled onClick={click} />
    </FormProvider>,
  )
  for (const button of container.querySelectorAll('button')) {
    expect(button.disabled).toBe(true)
    button.click()
  }
  expect(click).not.toHaveBeenCalled()
})
