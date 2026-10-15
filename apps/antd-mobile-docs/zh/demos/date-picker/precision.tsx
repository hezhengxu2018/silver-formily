import { DatePicker, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({
  initialValues: {
    month: '2024-03',
    year: '2024',
    time: '2024-03-01 10:30:00',
  },
})

export default function DatePickerPrecision() {
  return (
    <FormProvider form={form}>
      <Field
        name="month"
        title="选择月份"
        decorator={[FormItem]}
        component={[DatePicker]}
        x-component-props={{ picker: 'month' }}
      />
      <Field
        name="year"
        title="选择年份"
        decorator={[FormItem]}
        component={[DatePicker]}
        x-component-props={{ picker: 'year' }}
      />
      <Field
        name="time"
        title="日期时间"
        decorator={[FormItem]}
        component={[DatePicker]}
        x-component-props={{ showTime: true }}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
