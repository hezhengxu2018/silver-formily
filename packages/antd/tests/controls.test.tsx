import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { Form, FormItem, FormLayout, Input, NumberPicker, PreviewText, Select } from '../src'

it('associates all migrated input labels without requiring manual ids', async () => {
  const { getByRole } = await render(
    <Form form={createForm()}>
      <Field name="name" title="Name" decorator={[FormItem]} component={[Input]} />
      <Field name="notes" title="Notes" decorator={[FormItem]} component={[Input.TextArea]} />
      <Field name="role" title="Role" decorator={[FormItem]} component={[Select]} />
      <Field name="count" title="Count" decorator={[FormItem]} component={[NumberPicker]} />
    </Form>,
  )
  await expect.element(getByRole('textbox', { name: 'Name' })).toBeVisible()
  await expect.element(getByRole('textbox', { name: 'Notes' })).toBeVisible()
  await expect.element(getByRole('combobox', { name: 'Role' })).toBeInTheDocument()
  await expect.element(getByRole('spinbutton', { name: 'Count' })).toBeVisible()
})

it('retains explicit Select options when the field dataSource is empty', async () => {
  const form = createForm({ initialValues: { role: 'custom' } })
  const { getByRole, getByText } = await render(<Form form={form}><Field name="role" component={[Select, { options: [{ label: 'From props', value: 'custom' }], style: { width: 200 } }]} /></Form>)
  await getByRole('combobox').click()
  await page.getByText('From props', { exact: true }).last().click()
  expect(form.values.role).toBe('custom')
  form.setPattern('readPretty')
  await expect.element(getByText('From props', { exact: true })).toBeVisible()
})

it('displays pending feedback while asynchronous validation runs and clears it afterwards', async () => {
  let complete!: () => void
  const pending = new Promise<void>((resolve) => {
    complete = resolve
  })
  const form = createForm()
  const { container } = await render(
    <Form form={form}>
      <Field
        name="name"
        decorator={[FormItem]}
        component={[Input]}
        validator={async () => {
          await pending
        }}
      />
    </Form>,
  )
  const input = container.querySelector('input')!
  await page.getByRole('textbox').click()
  const validation = form.validate()
  await vi.waitFor(() => expect(container.querySelector('.silver-formily-form-item--status_pending')).not.toBeNull())
  await vi.waitFor(() => expect(container.querySelector('.anticon-loading')).not.toBeNull())
  expect(document.activeElement).toBe(input)
  complete()
  await validation
  await vi.waitFor(() => expect(container.querySelector('.silver-formily-form-item--status_pending')).toBeNull())
  expect(document.activeElement).toBe(input)
})

afterEach(async () => {
  await cleanup()
  vi.restoreAllMocks()
})

it.each(['outlined', 'filled', 'borderless', 'underlined'] as const)('uses native %s appearance for every input family', async (variant) => {
  const { container } = await render(
    <Form form={createForm()} variant={variant}>
      <FormItem.BaseItem label="Input"><Input /></FormItem.BaseItem>
      <FormItem.BaseItem label="TextArea"><Input.TextArea /></FormItem.BaseItem>
      <FormItem.BaseItem label="Select"><Select /></FormItem.BaseItem>
      <FormItem.BaseItem label="Number"><NumberPicker /></FormItem.BaseItem>
    </Form>,
  )
  const controls = container.querySelectorAll('.silver-formily-form-item__component > :first-child')
  expect(controls).toHaveLength(4)
  for (const control of controls)
    expect(control.className).toContain(`-${variant}`)
})

it('preserves nested native variant inheritance and explicit component overrides', async () => {
  const { container, rerender } = await render(
    <Form form={createForm()} variant="filled">
      <FormLayout>
        <FormItem.BaseItem><Input /></FormItem.BaseItem>
        <FormItem.BaseItem variant="underlined"><Input /></FormItem.BaseItem>
        <FormItem.BaseItem variant="borderless"><Input variant="outlined" /></FormItem.BaseItem>
      </FormLayout>
    </Form>,
  )
  const controls = container.querySelectorAll('.silver-formily-form-item__component > :first-child')
  expect(controls[0].className).toContain('-filled')
  expect(controls[1].className).toContain('-underlined')
  expect(controls[2].className).toContain('-outlined')
  await rerender(<FormLayout variant="borderless"><FormItem.BaseItem><Input /></FormItem.BaseItem></FormLayout>)
  expect(container.querySelector('.silver-formily-form-item__component > :first-child')!.className).toContain('-borderless')
})

it('renders Select dataSource options and writes user choices back to the field', async () => {
  const form = createForm()
  const { getByRole } = await render(<Form form={form}><Field name="role" dataSource={[{ label: 'Admin', value: 'admin' }]} component={[Select, { style: { width: 200 } }]} /></Form>)
  await getByRole('combobox').click()
  await page.getByText('Admin', { exact: true }).click()
  await vi.waitFor(() => expect(form.values.role).toBe('admin'))
})

it('preserves Select multiple labelInValue and custom field names in readPretty', async () => {
  const form = createForm({ pattern: 'readPretty', initialValues: { role: [{ value: 'admin', label: 'Fallback' }] } })
  const { getByText, container } = await render(
    <Form form={form}>
      <Field name="role" dataSource={[{ text: 'Administrator', key: 'admin' }]} component={[Select, { mode: 'multiple', labelInValue: true, fieldNames: { label: 'text', value: 'key' } }]} />
    </Form>,
  )
  await expect.element(getByText('Administrator')).toBeVisible()
  expect(container.querySelector('input')).toBeNull()
})

it('keeps zero and string precision values through NumberPicker and formats readPretty', async () => {
  const form = createForm({ initialValues: { count: 0, precision: '1.0000000000000001' } })
  const { getByRole, getByText } = await render(
    <Form form={form}>
      <Field name="count" component={[NumberPicker]} />
      <Field name="precision" pattern="readPretty" component={[NumberPicker, { stringMode: true, formatter: value => `value:${value}` }]} />
    </Form>,
  )
  await expect.element(getByRole('spinbutton')).toHaveValue('0')
  await expect.element(getByText('value:1.0000000000000001')).toBeVisible()
})

it('maps TextArea and all selected controls to readPretty and preserves explicit placeholders', async () => {
  const form = createForm({ initialValues: { text: 'hello', count: 0 } })
  const { getByRole, getByText, container } = await render(
    <Form form={form} previewTextPlaceholder="Empty">
      <Field name="text" required decorator={[FormItem]} component={[Input.TextArea]} />
      <Field name="count" component={[NumberPicker]} />
      <Field name="missing" component={[Select]} />
    </Form>,
  )
  await getByRole('textbox').fill('new text')
  form.setPattern('readPretty')
  await expect.element(getByText('new text')).toBeVisible()
  await expect.element(getByText('0', { exact: true })).toBeVisible()
  await expect.element(getByText('Empty')).toBeVisible()
  await vi.waitFor(() => expect(container.querySelector('.silver-formily-form-item__asterisk')).toBeNull())
  form.setPattern('editable')
  await expect.element(getByRole('textbox')).toHaveValue('new text')
})

it('preserves zero labels, nested option groups and empty placeholder providers', async () => {
  const { getByText, container } = await render(
    <PreviewText.Placeholder value="">
      <PreviewText value={0} />
      <PreviewText.Select value={0} options={[{ label: 'group', options: [{ label: 0, value: 0 }] }]} />
      <PreviewText.Input />
    </PreviewText.Placeholder>,
  )
  expect(getByText('0', { exact: true }).elements()).toHaveLength(2)
  expect(container.textContent).not.toContain('N/A')
})

it('inherits feedback, size and native variant but respects explicit control props', async () => {
  const { container } = await render(
    <Form form={createForm()}>
      <FormItem.BaseItem feedbackStatus="error" size="large" variant="borderless">
        <Input aria-label="inherited" />
        <Input aria-label="explicit" status="warning" variant="filled" size="small" />
      </FormItem.BaseItem>
    </Form>,
  )
  const inherited = container.querySelector('[aria-label="inherited"]')!.closest('.ant-input-affix-wrapper')!
  const explicit = container.querySelector('[aria-label="explicit"]')!.closest('.ant-input-affix-wrapper')!
  expect(inherited.className).toContain('status-error')
  expect(inherited.className).toContain('borderless')
  expect(inherited.className).toContain('lg')
  expect(explicit.className).toContain('status-warning')
  expect(explicit.className).toContain('filled')
  expect(explicit.className).toContain('sm')
})
