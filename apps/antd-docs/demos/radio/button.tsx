import { Form, FormItem, Radio, Reset, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField } from '@silver-formily/react'
import { Button, Space } from 'antd'

const SchemaField = createSchemaField({ components: { FormItem, Radio } })

const schema = {
  type: 'object',
  properties: {
    choice: {
      'type': 'string',
      'title': '按钮单选组',
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'enum': [
        { label: '选项 A', value: 'a' },
        { label: '选项 B', value: 'b' },
        { label: '选项 C', value: 'c', disabled: true },
      ],
      'x-component-props': {
        optionType: 'button',
        buttonStyle: 'solid',
      },
    },
  },
}

const form = createForm({ initialValues: { choice: 'a' } })

export default function Demo() {
  return (
    <Form form={form} labelCol={6} wrapperCol={16}>
      <SchemaField schema={schema} />
      <Space wrap>
        <Button onClick={() => form.setPattern(form.pattern === 'readPretty' ? 'editable' : 'readPretty')}>切换阅读态</Button>
        <Reset>重置</Reset>
        <Submit onSubmit={values => console.log(values)}>提交到控制台</Submit>
      </Space>
    </Form>
  )
}
