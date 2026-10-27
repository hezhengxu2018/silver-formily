import { CalendarPicker, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({
  initialValues: {
    birthday: '2026-10-15',
  },
})

export default function CalendarPickerBasic() {
  return (
    <FormProvider form={form}>
      <Field
        name="birthday"
        title="生日"
        decorator={[FormItem]}
        component={[CalendarPicker]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
