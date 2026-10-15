import { DatePicker, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({
  initialValues: {
    birthday: '2020-01-01',
  },
})

export default function DatePickerBasic() {
  return (
    <FormProvider form={form}>
      <Field
        name="birthday"
        title="生日"
        decorator={[FormItem]}
        component={[DatePicker]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
