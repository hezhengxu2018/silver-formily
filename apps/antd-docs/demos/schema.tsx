import { Form, FormButtonGroup, FormItem, Input, NumberPicker, Select, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField } from '@silver-formily/react'
import { useState } from 'react'
import { DemoConfig, Result } from './_shared'

const SchemaField = createSchemaField({ components: { FormItem, Input, Select, NumberPicker } })
export default function Demo() {
  const [form] = useState(() => createForm())
  const [result, setResult] = useState<unknown>()
  return (
    <DemoConfig>
      <Form form={form} layout="vertical" onAutoSubmit={setResult} onAutoSubmitFailed={() => {}}>
        <SchemaField schema={{
          type: 'object',
          properties: {
            name: { 'type': 'string', 'title': '姓名', 'required': true, 'x-decorator': 'FormItem', 'x-component': 'Input' },
            role: { 'type': 'string', 'title': '角色', 'enum': [{ label: '管理员', value: 'admin' }, { label: '成员', value: 'member' }], 'x-decorator': 'FormItem', 'x-component': 'Select', 'x-component-props': { style: { width: 220 } } },
            count: { 'type': 'number', 'title': '数量', 'default': 0, 'x-decorator': 'FormItem', 'x-component': 'NumberPicker' },
          },
        }}
        />
        <FormButtonGroup><Submit /></FormButtonGroup>
      </Form>
      <Result value={result} />
    </DemoConfig>
  )
}
