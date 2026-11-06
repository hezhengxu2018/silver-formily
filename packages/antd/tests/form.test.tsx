import type { InputRef } from 'antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField, Field, FormProvider } from '@silver-formily/react'
import { createRef, StrictMode } from 'react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { Form, FormButtonGroup, FormItem, Input, NumberPicker, Reset, Select, Submit } from '../src'

afterEach(async () => {
  await cleanup()
  vi.restoreAllMocks()
})

it('submits edited JSX fields once through a native form and resets initial values', async () => {
  const form = createForm({ initialValues: { name: 'Alice', count: 0 } })
  const submit = vi.fn()
  const { getByRole } = await render(
    <StrictMode>
      <Form form={form} onAutoSubmit={submit}>
        <Field name="name" title="Name" decorator={[FormItem, { labelFor: 'name' }]} component={[Input, { id: 'name' }]} />
        <Field name="count" component={[NumberPicker, { 'aria-label': 'Count' }]} />
        <FormButtonGroup>
          <Submit />
          <Reset />
        </FormButtonGroup>
      </Form>
    </StrictMode>,
  )
  await getByRole('textbox', { name: 'Name' }).fill('Bob')
  await getByRole('spinbutton', { name: 'Count' }).fill('3')
  await getByRole('button', { name: /提\s*交/ }).click()
  await vi.waitFor(() => expect(submit).toHaveBeenCalledWith({ name: 'Bob', count: 3 }))
  expect(submit).toHaveBeenCalledOnce()
  await getByRole('button', { name: /重\s*置/ }).click()
  await expect.element(getByRole('textbox')).toHaveValue('Alice')
  await expect.element(getByRole('spinbutton')).toHaveValue('0')
})

it('shows required validation and prevents submission until valid', async () => {
  const form = createForm()
  const submit = vi.fn()
  const failed = vi.fn()
  const { getByRole, container } = await render(
    <Form form={form} onAutoSubmit={submit} onAutoSubmitFailed={failed}>
      <Field name="name" title="Name" required decorator={[FormItem]} component={[Input]} />
      <Submit />
    </Form>,
  )
  await getByRole('button').click()
  await vi.waitFor(() => expect(failed).toHaveBeenCalledOnce())
  expect(submit).not.toHaveBeenCalled()
  expect(container.querySelector('.silver-formily-form-item__asterisk')).not.toBeNull()
  await expect.element(getByRole('alert')).toBeVisible()
  expect(container.querySelector('.ant-input-affix-wrapper')?.className).toContain('status-error')
  await getByRole('textbox').fill('ok')
  await getByRole('button').click()
  await vi.waitFor(() => expect(submit).toHaveBeenCalledOnce())
})

it('supports JSON Schema with datasource and inherited FormProvider', async () => {
  const form = createForm()
  const SchemaField = createSchemaField({ components: { FormItem, Input, Select, NumberPicker } })
  const { getByRole } = await render(
    <FormProvider form={form}>
      <Form>
        <SchemaField schema={{
          type: 'object',
          properties: {
            name: { 'type': 'string', 'default': 'schema', 'x-decorator': 'FormItem', 'x-component': 'Input' },
            count: { 'type': 'number', 'default': 0, 'x-component': 'NumberPicker' },
            role: { 'type': 'string', 'default': 'member', 'enum': [{ label: 'Member', value: 'member' }], 'x-component': 'Select' },
          },
        }}
        />
      </Form>
    </FormProvider>,
  )
  await expect.element(getByRole('textbox')).toHaveValue('schema')
  await expect.element(getByRole('spinbutton')).toHaveValue('0')
  await vi.waitFor(() => expect(form.query('role').take(field => 'dataSource' in field ? field.dataSource : undefined)).toEqual([{ label: 'Member', value: 'member' }]))
})

it('forwards Input refs through wrappers and survives StrictMode replay', async () => {
  const ref = createRef<InputRef>()
  const form = createForm()
  const screen = await render(
    <StrictMode>
      <Form form={form}>
        <Field
          name="name"
          component={[Input, { ref: (value) => {
            ref.current = value
          } }]}
        />
      </Form>
    </StrictMode>,
  )
  expect(ref.current?.input?.tagName).toBe('INPUT')
  ref.current?.focus()
  expect(document.activeElement).toBe(ref.current?.input)
  const field = form.query('name').take()!
  await screen.unmount()
  await Promise.resolve()
  expect(ref.current).toBeNull()
  expect(field.mounted).toBe(false)
})

it('reports asynchronous native submission failures without unhandled rejections', async () => {
  const error = new Error('network')
  const failed = vi.fn()
  const { getByRole } = await render(
    <Form
      form={createForm()}
      onAutoSubmit={async () => {
        throw error
      }}
      onAutoSubmitFailed={failed}
    >
      <Submit />
    </Form>,
  )
  await getByRole('button').click()
  await vi.waitFor(() => expect(failed).toHaveBeenCalledWith(error))
})
