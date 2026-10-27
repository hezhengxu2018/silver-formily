import { CalendarPicker, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({
  initialValues: {
    disabled: '2026-10-15',
    readOnly: '2026-10-15',
    readPretty: ['2026-10-15', '2026-10-18'],
  },
})

export default function CalendarPickerStatus() {
  return (
    <FormProvider form={form}>
      <Field name="disabled" title="禁用" pattern="disabled" decorator={[FormItem]} component={[CalendarPicker]} />
      <Field name="readOnly" title="只读" pattern="readOnly" decorator={[FormItem]} component={[CalendarPicker]} />
      <Field name="readPretty" title="阅读态" pattern="readPretty" decorator={[FormItem]} component={[CalendarPicker, { selectionMode: 'range' }]} />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
