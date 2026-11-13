import { AutoComplete, Form, FormItem, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField } from '@silver-formily/react'
import { useState } from 'react'

const SchemaField = createSchemaField({ components: { AutoComplete, FormItem } })
const schema = {
  type: 'object',
  properties: {
    value: {
      'type': 'string',
      'title': '自动完成',
      'required': true,
      'enum': [{ label: 'Silver Formily', value: 'silver' }, { label: 'Ant Design', value: 'antd' }],
      'x-decorator': 'FormItem',
      'x-component': 'AutoComplete',
      'x-component-props': { style: { width: '100%' } },
    },
  },
}

export default function Demo() {
  const [form] = useState(() => createForm())
  return (
    <Form form={form} labelCol={6} wrapperCol={16}>
      <SchemaField schema={schema} />
      <Submit onSubmit={console.log} onSubmitFailed={console.log}>提交到控制台</Submit>
    </Form>
  )
}
