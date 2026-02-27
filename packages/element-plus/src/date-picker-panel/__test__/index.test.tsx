import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import DatePickerPanel from '../index'
import 'element-plus/theme-chalk/index.css'

describe('datePickerPanel', () => {
  it('should render panel', async () => {
    render(() => (
      <FormProvider form={createForm()}>
        <Field name="date" component={[DatePickerPanel]} />
      </FormProvider>
    ))

    const panel = document.querySelector('.el-picker-panel')
    expect(panel).toBeInTheDocument()
  })

  it('should update formatted form value after selecting date', async () => {
    const form = createForm()
    render(() => (
      <FormProvider form={form}>
        <Field name="date" component={[DatePickerPanel]} />
      </FormProvider>
    ))

    const dateCell = document.querySelector('.el-date-table td.available')
    expect(dateCell).toBeInTheDocument()
    await userEvent.click(dateCell)

    expect(form.values.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('should render normally when readOnly is true', async () => {
    render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="date"
          readOnly={true}
          component={[DatePickerPanel]}
        />
      </FormProvider>
    ))

    const panel = document.querySelector('.el-picker-panel')
    expect(panel).toBeInTheDocument()
  })

  it('should keep custom valueFormat and dateFormat props', async () => {
    const form = createForm()
    render(() => (
      <FormProvider form={form}>
        <Field
          name="date"
          component={[
            DatePickerPanel,
            {
              valueFormat: 'x',
              dateFormat: 'YYYY/MM/DD',
            },
          ]}
        />
      </FormProvider>
    ))

    const dateCell = document.querySelector('.el-date-table td.available')
    expect(dateCell).toBeInTheDocument()
    await userEvent.click(dateCell)

    expect(String(form.values.date)).toMatch(/^\d{10,13}$/)
  })
})
