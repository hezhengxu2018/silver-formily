import { FormButtonGroup, FormItem, Submit, Switch } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

const form = createForm({ initialValues: { switch: false } })

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

function onSubmitFailed(feedbacks: unknown) {
  return Prompts.alert(JSON.stringify(feedbacks, null, 2))
}

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
        <Submit onSubmitFailed={onSubmitFailed} onSubmit={onSubmit}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
