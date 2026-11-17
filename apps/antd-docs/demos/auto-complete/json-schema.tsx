import { AutoComplete, Form, FormItem, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField } from '@silver-formily/react'

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

const form = createForm()

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

function onSubmitFailed(feedbacks: unknown) {
  return Prompts.alert(JSON.stringify(feedbacks, null, 2))
}

export default function Demo() {
  return (
    <Form form={form} labelCol={6} wrapperCol={16}>
      <SchemaField schema={schema} />
      <Submit onSubmit={onSubmit} onSubmitFailed={onSubmitFailed}>提交</Submit>
    </Form>
  )
}
