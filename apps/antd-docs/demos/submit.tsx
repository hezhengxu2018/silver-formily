import { Form, FormItem, Input, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'

const form = createForm()

function onSubmitSuccess(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

function onSubmitFailed(feedbacks: unknown) {
  return Prompts.alert(JSON.stringify(feedbacks, null, 2))
}

export default function Demo() {
  return (
    <Form form={form} layout="vertical">
      <Field name="name" title="姓名" required decorator={[FormItem]} component={[Input]} />
      <Submit
        onSubmit={async (values) => {
          await new Promise(resolve => setTimeout(resolve, 800))
          return values
        }}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFailed={onSubmitFailed}
      >
        异步提交
      </Submit>
    </Form>
  )
}
