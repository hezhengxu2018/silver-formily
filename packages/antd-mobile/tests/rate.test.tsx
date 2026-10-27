import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { afterEach, expect, it } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { Rate } from '../src'

afterEach(cleanup)

it('updates numeric field values and clears the current rating', async () => {
  const form = createForm({ initialValues: { score: 2 } })
  const screen = await render(
    <FormProvider form={form}>
      <Field name="score" component={[Rate]} />
    </FormProvider>,
  )
  await expect.element(screen.getByRole('radio', { name: '2', exact: true })).toHaveAttribute('aria-checked', 'true')
  await screen.getByRole('radio', { name: '4', exact: true }).click()
  expect(form.values.score).toBe(4)
  await screen.getByRole('radio', { name: '4', exact: true }).click()
  expect(form.values.score).toBe(0)
})

it('supports half ratings and disabling clear', async () => {
  const form = createForm({ initialValues: { score: 2.5 } })
  const screen = await render(
    <FormProvider form={form}>
      <Field name="score" component={[Rate, { allowHalf: true, allowClear: false, count: 3 }]} />
    </FormProvider>,
  )
  await expect.element(screen.getByRole('radio', { name: '2.5', exact: true })).toHaveAttribute('aria-checked', 'true')
  await screen.getByRole('radio', { name: '1.5', exact: true }).click()
  expect(form.values.score).toBe(1.5)
  await screen.getByRole('radio', { name: '1.5', exact: true }).click()
  expect(form.values.score).toBe(1.5)
})

it.each(['disabled', 'readOnly', 'readPretty'] as const)('prevents changes in %s fields', async (pattern) => {
  const form = createForm({ initialValues: { score: 3 } })
  const screen = await render(
    <FormProvider form={form}>
      <Field name="score" pattern={pattern} component={[Rate]} />
    </FormProvider>,
  )
  await expect.element(screen.getByRole('radiogroup')).toHaveAttribute('aria-readonly', 'true')
  await screen.getByRole('radio', { name: '5', exact: true }).click()
  expect(form.values.score).toBe(3)
})
