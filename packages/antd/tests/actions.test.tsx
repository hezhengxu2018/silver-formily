import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { Form, FormItem, Input, Reset, Submit } from '../src'

afterEach(async () => {
  await cleanup()
  vi.restoreAllMocks()
})

it('blocks duplicate programmatic submissions and keeps loading even with loading=false', async () => {
  let complete!: (value: string) => void
  const submit = vi.fn(() => new Promise<string>((resolve) => {
    complete = resolve
  }))
  const success = vi.fn()
  const form = createForm({ initialValues: { name: 'Alice' } })
  const { container } = await render(<Form form={form}><Submit loading={false} onSubmit={submit} onSubmitSuccess={success} /></Form>)
  const button = container.querySelector('button')!
  button.click()
  button.click()
  await vi.waitFor(() => expect(submit).toHaveBeenCalledOnce())
  await vi.waitFor(() => expect(button.disabled).toBe(true))
  complete('done')
  await vi.waitFor(() => expect(success).toHaveBeenCalledWith('done'))
  await vi.waitFor(() => expect(button.disabled).toBe(false))
})

it('does not combine native and programmatic submit callbacks', async () => {
  const autoSubmit = vi.fn()
  const submit = vi.fn()
  const { getByRole } = await render(<Form form={createForm()} onAutoSubmit={autoSubmit}><Submit onSubmit={submit} htmlType="submit" /></Form>)
  await getByRole('button').click()
  await vi.waitFor(() => expect(submit).toHaveBeenCalledOnce())
  expect(autoSubmit).not.toHaveBeenCalled()
})

it.each(['false', 'preventDefault'] as const)('honors %s cancellation for native submit, custom submit and reset', async (mode) => {
  const form = createForm({ initialValues: { name: 'Alice' } })
  form.setValues({ name: 'Bob' })
  const submit = vi.fn()
  const cancel = (event: React.MouseEvent<HTMLElement>) => mode === 'false' ? false : event.preventDefault()
  const { getByRole } = await render(
    <Form form={form} onAutoSubmit={submit}>
      <Submit onClick={cancel}>native</Submit>
      <Submit onClick={cancel} onSubmit={submit}>custom</Submit>
      <Reset onClick={cancel}>reset</Reset>
    </Form>,
  )
  await getByRole('button', { name: 'native' }).click()
  await getByRole('button', { name: 'custom' }).click()
  await getByRole('button', { name: 'reset' }).click()
  expect(submit).not.toHaveBeenCalled()
  expect(form.values.name).toBe('Bob')
})

it('reports custom submit validation and network failures and allows retry', async () => {
  const form = createForm()
  const failed = vi.fn()
  const error = new Error('network')
  const submit = vi.fn(async () => {
    throw error
  })
  const { getByRole } = await render(
    <Form form={form}>
      <Field name="name" required component={[Input]} decorator={[FormItem]} />
      <Submit onSubmit={submit} onSubmitFailed={failed} />
    </Form>,
  )
  await getByRole('button').click()
  await vi.waitFor(() => expect(failed).toHaveBeenCalledOnce())
  expect(submit).not.toHaveBeenCalled()
  await getByRole('textbox').fill('ok')
  await getByRole('button').click()
  await vi.waitFor(() => expect(failed).toHaveBeenLastCalledWith(error))
  await vi.waitFor(() => expect(form.submitting).toBe(false))
})

it('force clears values and reports reset validation errors', async () => {
  const form = createForm({ initialValues: { name: 'Alice' } })
  const failed = vi.fn()
  const { getByRole } = await render(
    <FormProvider form={form}>
      <Field name="name" required decorator={[FormItem]} component={[Input]} />
      <Reset forceClear validate onResetValidateFailed={failed} />
    </FormProvider>,
  )
  await getByRole('button').click()
  await vi.waitFor(() => expect(failed).toHaveBeenCalledOnce())
  await expect.element(getByRole('textbox')).toHaveValue('')
})

it('blocks explicitly disabled and loading buttons', async () => {
  const submit = vi.fn()
  const { container } = await render(
    <Form form={createForm()}>
      <Submit disabled onSubmit={submit} />
      <Submit loading onSubmit={submit} />
    </Form>,
  )
  container.querySelectorAll('button').forEach(button => button.click())
  expect(submit).not.toHaveBeenCalled()
})
