import { createForm } from '@silver-formily/core'
import { FormProvider, useForm } from '@silver-formily/react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { Form, PreviewText, Submit } from '../src'

afterEach(cleanup)

function FormValue() {
  return <span>{useForm().values.name}</span>
}

it('renders nothing without a form instance', async () => {
  const { container } = await render(<Form>hidden</Form>)
  expect(container.querySelector('form')).toBeNull()
})

it('uses the explicit form, forwards layout props and provides the preview placeholder', async () => {
  const { container, getByText } = await render(
    <FormProvider form={createForm({ values: { name: 'parent' } })}>
      <Form form={createForm({ values: { name: 'explicit' } })} mode="card" className="custom-layout" previewTextPlaceholder="--">
        <FormValue />
        <PreviewText.Input />
      </Form>
    </FormProvider>,
  )
  expect(container.querySelector('.adm-list-card.custom-layout')).not.toBeNull()
  await expect.element(getByText('explicit')).toBeInTheDocument()
  await expect.element(getByText('--')).toBeInTheDocument()
})

it('inherits the parent form and submits once without propagating the native event', async () => {
  const form = createForm({ values: { name: 'inherited' } })
  const submit = vi.fn()
  const bubble = vi.fn()
  const { getByRole } = await render(
    <div onSubmit={bubble}>
      <FormProvider form={form}>
        <Form onAutoSubmit={submit}><Submit /></Form>
      </FormProvider>
    </div>,
  )
  await getByRole('button', { name: '提交' }).click()
  await vi.waitFor(() => expect(submit).toHaveBeenCalledExactlyOnceWith({ name: 'inherited' }))
  expect(bubble).not.toHaveBeenCalled()
})

it('reports validation failures without calling the submit callback', async () => {
  const form = createForm()
  form.createField({ name: 'name', required: true })
  const submit = vi.fn()
  const failed = vi.fn()
  const { getByRole } = await render(
    <Form form={form} onAutoSubmit={submit} onAutoSubmitFailed={failed}><Submit /></Form>,
  )
  await getByRole('button', { name: '提交' }).click()
  await vi.waitFor(() => expect(failed).toHaveBeenCalledOnce())
  expect(submit).not.toHaveBeenCalled()
  expect(failed.mock.calls[0][0][0]).toMatchObject({ path: 'name', type: 'error' })
})
