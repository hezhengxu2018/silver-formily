import { CalendarPicker, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({
  initialValues: {
    stay: ['2026-10-15', '2026-10-18'],
  },
})

export default function CalendarPickerRange() {
  return (
    <FormProvider form={form}>
      <Field
        name="stay"
        title="入住日期"
        decorator={[FormItem, { clearable: true }]}
        component={[CalendarPicker, { selectionMode: 'range', placeholder: '请选择入住和离店日期' }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
