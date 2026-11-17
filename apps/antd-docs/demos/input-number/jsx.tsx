import { FormButtonGroup, FormItem, InputNumber, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

const form = createForm()

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

function onSubmitFailed(feedbacks: unknown) {
  return Prompts.alert(JSON.stringify(feedbacks, null, 2))
}

export default function OfficialExample() {
  return (
    <FormProvider form={form}>
      <Field
        name="input"
        title="输入框"
        required
        decorator={[FormItem]}
        component={[
          InputNumber,
          {
            style: {
              width: 240,
            },
          },
        ]}
      />
      <FormButtonGroup>
        <Submit onSubmitFailed={onSubmitFailed} onSubmit={onSubmit}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
