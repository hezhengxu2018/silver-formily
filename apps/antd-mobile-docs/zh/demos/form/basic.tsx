import { Form, FormButtonGroup, FormItem, Input, Reset, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { Toast } from 'antd-mobile'

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

const form = createForm({ initialValues: { username: '张三' } })

export default function FormBasic() {
  return (
    <Form
      form={form}
      onAutoSubmit={onSubmit}
      onAutoSubmitFailed={() => Toast.show({ content: '请填写必填项后再提交' })}
    >
      <Field name="username" title="用户名" required decorator={[FormItem]} component={[Input]} />
      <FormButtonGroup layout="horizontal">
        <Reset>重置</Reset>
        <Submit>提交</Submit>
      </FormButtonGroup>
    </Form>
  )
}
