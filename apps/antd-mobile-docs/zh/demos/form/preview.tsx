import { Form, FormButtonGroup, FormItem, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

const form = createForm({
  pattern: 'readPretty',
  initialValues: { username: '张三' },
})

export default function FormPreview() {
  return (
    <Form form={form} previewTextPlaceholder="暂无信息" onAutoSubmit={onSubmit}>
      <Field name="username" title="用户名" decorator={[FormItem]} component={[Input]} />
      <Field name="email" title="邮箱" decorator={[FormItem]} component={[Input]} />
      <FormButtonGroup><Submit>查看表单值</Submit></FormButtonGroup>
    </Form>
  )
}
