import { Checkbox, Form, FormItem, Reset, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { Button, Space } from 'antd'


const form = createForm({ initialValues: { value: false } })

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

export default function Demo() {
  return (
    <Form form={form} labelCol={6} wrapperCol={16}>
      <Field name="value" title="复选框" decorator={[FormItem]} component={[Checkbox, { children: '同意条款' }]} />
      <Field name="group" title="多选" decorator={[FormItem]} component={[Checkbox.Group, { options: ['A', 'B'] }]} />
      <Space wrap>
        <Button onClick={() => form.setPattern(form.pattern === 'readPretty' ? 'editable' : 'readPretty')}>切换阅读态</Button>
        <Reset>重置</Reset>
        <Submit onSubmit={onSubmit}>提交</Submit>
      </Space>
    </Form>
  )
}
