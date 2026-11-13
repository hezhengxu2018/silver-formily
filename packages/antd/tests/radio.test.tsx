import { createForm } from '@silver-formily/core'
import { createSchemaField, Field } from '@silver-formily/react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { Form, Radio } from '../src'

afterEach(cleanup)

it('supports button-style Radio.Group through schema enum and component props', async () => {
  const SchemaField = createSchemaField({ components: { Radio } })
  const form = createForm({ initialValues: { choice: 0 } })
  const onChange = vi.fn()
  const { container, getByRole, getByText } = await render(
    <Form form={form}>
      <SchemaField schema={{
        type: 'object',
        properties: {
          choice: {
            'type': 'number',
            'enum': [
              { label: 'Zero', value: 0 },
              { label: 'One', value: 1 },
              { label: 'Two', value: 2, disabled: true },
            ],
            'x-component': 'Radio.Group',
            'x-component-props': { optionType: 'button', buttonStyle: 'solid', onChange },
          },
        },
      }}
      />
    </Form>,
  )
  expect(container.querySelectorAll('.ant-radio-button-wrapper')).toHaveLength(3)
  await expect.element(getByRole('radio', { name: 'Zero' })).toBeChecked()
  await expect.element(getByRole('radio', { name: 'Two' })).toBeDisabled()
  await getByText('One', { exact: true }).click()
  expect(form.values.choice).toBe(1)
  expect(onChange.mock.calls[0][0].target.value).toBe(1)
  form.setPattern('readPretty')
  await expect.element(getByText('One', { exact: true })).toBeVisible()
  await vi.waitFor(() => expect(container.querySelector('input')).toBeNull())
  form.setPattern('editable')
  await form.reset()
  await expect.element(getByRole('radio', { name: 'Zero' })).toBeChecked()
  form.setPattern('disabled')
  await expect.element(getByRole('radio', { name: 'One' })).toBeDisabled()
})

it.each(['default', 'button'] as const)('renders explicit options with optionType=%s', async (optionType) => {
  const form = createForm()
  const { container, getByText } = await render(
    <Form form={form}>
      <Field name="choice" component={[Radio.Group, { optionType, options: ['A', 'B'] }]} />
    </Form>,
  )
  expect(container.querySelectorAll('.ant-radio-button-wrapper')).toHaveLength(optionType === 'button' ? 2 : 0)
  await getByText('B', { exact: true }).click()
  expect(form.values.choice).toBe('B')
  form.setPattern('readPretty')
  await expect.element(getByText('B', { exact: true })).toBeVisible()
  await vi.waitFor(() => expect(container.querySelector('input')).toBeNull())
})
