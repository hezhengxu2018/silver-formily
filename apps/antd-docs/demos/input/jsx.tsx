import { FormButtonGroup, FormItem, Input, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

const form = createForm()

export default function OfficialExample() {
  return (
    <FormProvider form={form}>
      <Field
        name="input"
        title="输入框"
        required
        decorator={[FormItem]}
        component={[
          Input,
          {
            style: {
              width: 240,
            },
          },
        ]}
      />
      <Field
        name="textarea"
        title="文本框"
        required
        decorator={[FormItem]}
        component={[
          Input.TextArea,
          {
            style: {
              width: 400,
            },
          },
        ]}
      />
      <FormButtonGroup>
        <Submit onSubmitFailed={console.log} onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
