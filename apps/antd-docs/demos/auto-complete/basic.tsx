import { AutoComplete, Form, FormItem, Reset, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { Button, Space } from 'antd'

const form = createForm({ initialValues: { value: 'silver' } })

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

export default function Demo() {
  return (
    <Form form={form} labelCol={6} wrapperCol={16}>
      <Field
        name="value"
        title="自动完成"
        decorator={[FormItem]}
        dataSource={[{ label: 'Silver Formily', value: 'silver' }, { label: 'Ant Design', value: 'antd' }]}
        component={[AutoComplete, { placeholder: '输入文字或选择候选项', style: { width: '100%' } }]}
      />
      <Space wrap>
        <Button onClick={() => form.setPattern(form.pattern === 'readPretty' ? 'editable' : 'readPretty')}>切换阅读态</Button>
        <Reset>重置</Reset>
        <Submit onSubmit={onSubmit}>提交</Submit>
      </Space>
    </Form>
  )
}
