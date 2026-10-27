import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { afterEach, expect, it } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { Stepper } from '../src'

afterEach(cleanup)

it('formats display text while preserving numeric field values', async () => {
  const form = createForm({ initialValues: { price: 2.35 } })
  const screen = await render(
    <FormProvider form={form}>
      <Field
        name="price"
        component={[Stepper, {
          step: 0.01,
          digits: 2,
          formatter: (value?: number) => `${value ?? 0} 元`,
          parser: (text: string) => Number(text.replace(' 元', '')),
        }]}
      />
    </FormProvider>,
  )
  await expect.element(screen.getByRole('spinbutton')).toHaveValue('2.35 元')
  await screen.getByRole('button', { name: '增加' }).click()
  expect(form.values.price).toBe(2.36)
  await expect.element(screen.getByRole('spinbutton')).toHaveValue('2.36 元')
})

it('preserves empty values when allowEmpty is enabled', async () => {
  const form = createForm<{ quantity: number | null }>({ initialValues: { quantity: 2 } })
  const screen = await render(
    <FormProvider form={form}>
      <Field name="quantity" component={[Stepper, { allowEmpty: true }]} />
    </FormProvider>,
  )
  await screen.getByRole('spinbutton').fill('')
  const input = screen.getByRole('spinbutton').element() as HTMLInputElement
  input.blur()
  expect(form.values.quantity).toBeNull()
})

it('preserves precision in string mode', async () => {
  const form = createForm({ initialValues: { value: '0.123456789012345678' } })
  const screen = await render(
    <FormProvider form={form}>
      <Field
        name="value"
        component={[Stepper, {
          stringMode: true,
          step: '0.000000000000000001',
        }]}
      />
    </FormProvider>,
  )
  await screen.getByRole('button', { name: '增加' }).click()
  expect(form.values.value).toBe('0.123456789012345679')
})
