import { FormButtonGroup, FormItem, Submit, Switch } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

const form = createForm({ initialValues: { switch: false } })

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field
        name="switch"
        title="开关"
        decorator={[FormItem]}
        component={[Switch]}
      />
      <FormButtonGroup>
        <Submit onSubmitFailed={console.log} onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
