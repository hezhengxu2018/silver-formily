import { DatePicker, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({
  initialValues: {
    week: '2024-09-1w',
    quarter: '2024-Q1',
  },
})

export default function DatePickerWeekQuarter() {
  return (
    <FormProvider form={form}>
      <Field
        name="week"
        title="选择周"
        decorator={[FormItem]}
        component={[DatePicker]}
        x-component-props={{ picker: 'week' }}
      />
      <Field
        name="quarter"
        title="选择季度"
        decorator={[FormItem]}
        component={[DatePicker]}
        x-component-props={{ picker: 'quarter' }}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
