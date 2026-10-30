import { createForm, isField } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { observable } from '@silver-formily/reactive'
import { afterEach, expect, it } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { Checkbox, Radio, Selector } from '../src'

afterEach(cleanup)

interface Option {
  label: string
  value: string
  disabled?: boolean
}

it.each([
  { name: 'Checkbox.Group', renderField: (dataSource: Option[]) => <Field name="choice" dataSource={dataSource} component={[Checkbox.Group]} />, disabledSelector: 'input:disabled' },
  { name: 'Radio.Group', renderField: (dataSource: Option[]) => <Field name="choice" dataSource={dataSource} component={[Radio.Group]} />, disabledSelector: 'input:disabled' },
  { name: 'Selector', renderField: (dataSource: Option[]) => <Field name="choice" dataSource={dataSource} component={[Selector]} />, disabledSelector: '.adm-selector-item-disabled' },
])('updates nested dataSource labels and disabled state for $name', async ({ renderField, disabledSelector }) => {
  const form = createForm()
  const dataSource = observable<Option[]>([{ label: 'Original', value: 'a' }])
  const screen = await render(<FormProvider form={form}>{renderField(dataSource)}</FormProvider>)
  await expect.element(screen.getByText('Original')).toBeInTheDocument()
  const field = form.query('choice').take()
  if (!isField(field))
    throw new Error('Expected a data field')
  field.dataSource[0].label = 'Updated'
  field.dataSource[0].disabled = true
  await expect.element(screen.getByText('Updated')).toBeInTheDocument()
  await expect.poll(() => document.querySelectorAll(disabledSelector).length).toBe(1)
  field.dataSource[0].disabled = false
  await expect.poll(() => document.querySelectorAll(disabledSelector).length).toBe(0)
  field.setDataSource([{ label: 'Replaced', value: 'b' }])
  await expect.element(screen.getByText('Replaced')).toBeInTheDocument()
})

it('updates standalone checkbox titles without changing custom group labels', async () => {
  const form = createForm()
  const screen = await render(
    <FormProvider form={form}>
      <Field name="agree" title="Original" component={[Checkbox]} />
      <Field name="group" title="Group title" component={[Checkbox.Group]}>
        <Checkbox value="a">Custom label</Checkbox>
      </Field>
    </FormProvider>,
  )
  form.setFieldState('agree', { title: 'Updated' })
  await expect.element(screen.getByText('Updated')).toBeInTheDocument()
  await expect.element(screen.getByText('Custom label')).toBeInTheDocument()
  expect(document.body.textContent).not.toContain('Group title')
})

it('keeps selector loading ahead of readPretty and restores the selected label', async () => {
  const form = createForm({ initialValues: { choice: ['a'] } })
  const screen = await render(<FormProvider form={form}><Field name="choice" pattern="readPretty" dataSource={[{ label: 'Chosen', value: 'a' }]} component={[Selector]} /></FormProvider>)
  await expect.element(screen.getByText('Chosen')).toBeInTheDocument()
  form.setFieldState('choice', { loading: true })
  await expect.poll(() => document.querySelector('.adm-loading')).not.toBeNull()
  await expect.element(screen.getByText('Chosen')).not.toBeInTheDocument()
  form.setFieldState('choice', { loading: false })
  await expect.element(screen.getByText('Chosen')).toBeInTheDocument()
})
