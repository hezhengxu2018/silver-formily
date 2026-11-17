import { Form, FormButtonGroup, FormItem, Input, InputNumber, Select, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField } from '@silver-formily/react'

const SchemaField = createSchemaField({ components: { FormItem, Input, Select, InputNumber } })
const form = createForm()

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

function onSubmitFailed(feedbacks: unknown) {
  return Prompts.alert(JSON.stringify(feedbacks, null, 2))
}

export default function Demo() {
  return (
    <Form form={form} layout="vertical" onAutoSubmit={onSubmit} onAutoSubmitFailed={onSubmitFailed}>
      <SchemaField schema={{
        type: 'object',
        properties: {
          name: { 'type': 'string', 'title': '姓名', 'required': true, 'x-decorator': 'FormItem', 'x-component': 'Input' },
          role: { 'type': 'string', 'title': '角色', 'enum': [{ label: '管理员', value: 'admin' }, { label: '成员', value: 'member' }], 'x-decorator': 'FormItem', 'x-component': 'Select', 'x-component-props': { style: { width: 220 } } },
          count: { 'type': 'number', 'title': '数量', 'default': 0, 'x-decorator': 'FormItem', 'x-component': 'InputNumber' },
        },
      }}
      />
      <FormButtonGroup><Submit /></FormButtonGroup>
    </Form>
  )
}
