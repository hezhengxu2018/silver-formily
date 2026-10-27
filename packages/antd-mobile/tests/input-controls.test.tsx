import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { afterEach, expect, it } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { PasscodeInput, Segmented, Slider } from '../src'

afterEach(cleanup)

it('binds segmented dataSource and displays its label in readPretty', async () => {
  const form = createForm({ initialValues: { period: 'day' } })
  const screen = await render(
    <FormProvider form={form}>
      <Field name="period" dataSource={[{ label: 'Daily', value: 'day' }, { label: 'Weekly', value: 'week' }]} component={[Segmented]} />
    </FormProvider>,
  )
  await screen.getByText('Weekly').click()
  expect(form.values.period).toBe('week')
  form.setFieldState('period', { pattern: 'readPretty' })
  await expect.element(screen.getByText('Weekly')).toBeInTheDocument()
  await expect.poll(() => document.querySelector('input')).toBeNull()
})

it('masks passcodes in readPretty and prevents editing in readOnly', async () => {
  const form = createForm({ initialValues: { pin: '1234' } })
  const screen = await render(
    <FormProvider form={form}>
      <Field name="pin" pattern="readPretty" component={[PasscodeInput]} />
    </FormProvider>,
  )
  await expect.element(screen.getByText('••••')).toBeInTheDocument()
  expect(document.body.textContent).not.toContain('1234')
  form.setFieldState('pin', { pattern: 'readOnly' })
  await expect.element(screen.getByText('••••')).toBeInTheDocument()
  await expect.poll(() => document.querySelector('input')).toBeNull()
  form.setFieldState('pin', { pattern: 'editable' })
  await expect.poll(() => document.querySelector('input')?.value).toBe('1234')
  const input = document.querySelector('input')!
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!
  setter.call(input, '5678')
  input.dispatchEvent(new Event('input', { bubbles: true }))
  await expect.poll(() => form.values.pin).toBe('5678')
})

it('displays slider ranges in readPretty and disables readOnly sliders', async () => {
  const form = createForm({ initialValues: { amount: [0, 50] } })
  const screen = await render(
    <FormProvider form={form}>
      <Field name="amount" pattern="readPretty" component={[Slider, { range: true }]} />
    </FormProvider>,
  )
  await expect.element(screen.getByText('0 ~ 50')).toBeInTheDocument()
  form.setFieldState('amount', { pattern: 'readOnly' })
  await expect.poll(() => document.querySelector('.adm-slider')?.classList.contains('adm-slider-disabled')).toBe(true)
  expect(form.values.amount).toEqual([0, 50])
})
