import { Form, FormButtonGroup, FormItem, Input, Reset, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'

const form = createForm({ initialValues: { name: '张三' } })

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

function onSubmitFailed(feedbacks: unknown) {
  return Prompts.alert(JSON.stringify(feedbacks, null, 2))
}

export default function Demo() {
  return (
    <Form form={form} labelCol={5} wrapperCol={17} onAutoSubmit={onSubmit} onAutoSubmitFailed={onSubmitFailed}>
      <Field name="name" title="姓名" required decorator={[FormItem, { labelFor: 'basic-name' }]} component={[Input, { id: 'basic-name', placeholder: '请输入姓名' }]} />
      <FormButtonGroup.FormItem>
        <Submit />
        <Reset />
      </FormButtonGroup.FormItem>
    </Form>
  )
}
