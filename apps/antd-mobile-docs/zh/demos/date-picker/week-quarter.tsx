import { DatePicker, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

const form = createForm({
  initialValues: {
    week: '2024-W09',
    quarter: '2024-Q1',
  },
})

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

export default function DatePickerWeekQuarter() {
  return (
    <FormProvider form={form}>
      <Field
        name="week"
        title="选择周"
        decorator={[FormItem]}
        component={[DatePicker, { picker: 'week' }]}
      />
      <Field
        name="quarter"
        title="选择季度"
        decorator={[FormItem]}
        component={[DatePicker, { picker: 'quarter' }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
