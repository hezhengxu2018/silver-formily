import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { Checkbox, Radio, Selector, Switch } from '../src'

afterEach(cleanup)

interface TestFieldProps {
  pattern?: 'readOnly'
  readOnly?: boolean
  onChange: () => void
}

const cases = [
  { name: 'Switch', renderField: ({ pattern, readOnly, ...props }: TestFieldProps) => <Field name="value" pattern={pattern} readOnly={readOnly} component={[Switch, props]} />, initial: false, next: true, selector: '.adm-switch', disabledSelector: '.adm-switch-disabled' },
  { name: 'Checkbox', renderField: ({ pattern, readOnly, ...props }: TestFieldProps) => <Field name="value" pattern={pattern} readOnly={readOnly} component={[Checkbox, { ...props, children: 'Agree' }]} />, initial: false, next: true, selector: '.adm-checkbox', disabledSelector: 'input:disabled' },
  { name: 'Radio', renderField: ({ pattern, readOnly, ...props }: TestFieldProps) => <Field name="value" pattern={pattern} readOnly={readOnly} component={[Radio, { ...props, children: 'Agree' }]} />, initial: false, next: true, selector: '.adm-radio', disabledSelector: 'input:disabled' },
  { name: 'Checkbox.Group', renderField: ({ pattern, readOnly, ...props }: TestFieldProps) => <Field name="value" pattern={pattern} readOnly={readOnly} component={[Checkbox.Group, { ...props, options: ['a', 'b'] }]} />, initial: ['a'], next: ['a', 'b'], selector: '.adm-checkbox:last-child', disabledSelector: 'input:disabled' },
  { name: 'Radio.Group', renderField: ({ pattern, readOnly, ...props }: TestFieldProps) => <Field name="value" pattern={pattern} readOnly={readOnly} component={[Radio.Group, { ...props, options: ['a', 'b'] }]} />, initial: 'a', next: 'b', selector: '.adm-radio:last-child', disabledSelector: 'input:disabled' },
  { name: 'Selector', renderField: ({ pattern, readOnly, ...props }: TestFieldProps) => <Field name="value" pattern={pattern} readOnly={readOnly} component={[Selector, { ...props, options: [{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }] }]} />, initial: ['a'], next: ['b'], selector: '.adm-selector-item:last-child', disabledSelector: '.adm-selector-item-disabled' },
]

it.each(cases)('protects $name in readOnly and restores editing', async ({ renderField, initial, next, selector, disabledSelector }) => {
  const form = createForm({ initialValues: { value: initial } })
  const onChange = vi.fn()
  await render(<FormProvider form={form}>{renderField({ pattern: 'readOnly', onChange })}</FormProvider>)
  await expect.poll(() => document.querySelectorAll(disabledSelector).length).toBeGreaterThan(0)
  Array.from(document.querySelectorAll<HTMLElement>(selector)).at(-1)!.click()
  expect(form.values.value).toEqual(initial)
  expect(onChange).not.toHaveBeenCalled()

  form.setFieldState('value', { pattern: 'editable' })
  await expect.poll(() => document.querySelectorAll(disabledSelector).length).toBe(0)
  Array.from(document.querySelectorAll<HTMLElement>(selector)).at(-1)!.click()
  await expect.poll(() => form.values.value).toEqual(next)
  expect(onChange).toHaveBeenCalledOnce()
})

it.each(cases)('protects $name with the field readOnly flag', async ({ renderField, initial, selector, disabledSelector }) => {
  const form = createForm({ initialValues: { value: initial } })
  const onChange = vi.fn()
  await render(<FormProvider form={form}>{renderField({ readOnly: true, onChange })}</FormProvider>)
  await expect.poll(() => document.querySelectorAll(disabledSelector).length).toBeGreaterThan(0)
  Array.from(document.querySelectorAll<HTMLElement>(selector)).at(-1)!.click()
  expect(form.values.value).toEqual(initial)
  expect(onChange).not.toHaveBeenCalled()
})

it('protects custom checkbox and radio group children in readOnly', async () => {
  const form = createForm({ initialValues: { checks: ['a'], radio: 'a' } })
  await render(
    <FormProvider form={form}>
      <Field name="checks" readOnly component={[Checkbox.Group]}>
        <Checkbox value="a">A</Checkbox>
        <Checkbox value="b">B</Checkbox>
      </Field>
      <Field name="radio" readOnly component={[Radio.Group]}>
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </Field>
    </FormProvider>,
  )
  await expect.poll(() => document.querySelectorAll('input:disabled').length).toBe(4)
  document.querySelectorAll<HTMLElement>('label').forEach(label => label.click())
  expect(form.values).toEqual({ checks: ['a'], radio: 'a' })
})
