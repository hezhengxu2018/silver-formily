import { CalendarPicker, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({
  initialValues: {
    appointment: '2026/10/15',
  },
})

export default function CalendarPickerOptions() {
  return (
    <FormProvider form={form}>
      <Field
        name="appointment"
        title="预约日期"
        decorator={[FormItem]}
        component={[CalendarPicker, {
          format: 'YYYY/MM/DD',
          min: new Date(2026, 9, 1),
          max: new Date(2026, 9, 31),
          weekStartsOn: 'Monday',
          shouldDisableDate: (date: Date) => date.getDay() === 0 || date.getDay() === 6,
        }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
