import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { afterEach, expect, it } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { DatePicker } from '../src'

afterEach(cleanup)

it('renders formatted value with default date format', async () => {
  const form = createForm({ initialValues: { date: '2024-03-15' } })
  const { getByText } = await render(
    <FormProvider form={form}>
      <Field name="date" component={[DatePicker]} />
    </FormProvider>,
  )

  await expect.element(getByText('2024-03-15')).toBeInTheDocument()
})

it('renders month picker with month format', async () => {
  const form = createForm({ initialValues: { month: '2024-03' } })
  const { getByText } = await render(
    <FormProvider form={form}>
      <Field
        name="month"
        component={[DatePicker, { picker: 'month' }]}
      />
    </FormProvider>,
  )

  await expect.element(getByText('2024-03')).toBeInTheDocument()
})

it('shows placeholder when value is empty', async () => {
  const form = createForm()
  const { getByText } = await render(
    <FormProvider form={form}>
      <Field
        name="date"
        component={[DatePicker, { placeholder: '请选择日期' }]}
      />
    </FormProvider>,
  )

  await expect.element(getByText('请选择日期')).toBeInTheDocument()
})
