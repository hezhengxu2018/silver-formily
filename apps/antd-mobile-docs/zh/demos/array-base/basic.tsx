import { ArrayBase, Form, FormButtonGroup, FormItem, FormLayout, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { ArrayField, Field } from '@silver-formily/react'
import { useState } from 'react'

function ItemHeader() {
  const index = ArrayBase.useIndex()
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12 }}>
      <span style={{ flex: 1 }}>
        联系人
        {index + 1}
      </span>
      <ArrayBase.MoveUp aria-label="上移" />
      <ArrayBase.MoveDown aria-label="下移" />
      <ArrayBase.Remove aria-label="删除" />
    </div>
  )
}

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

export default function BasicDemo() {
  const [form] = useState(() => createForm({ initialValues: { contacts: [{ name: '张三' }] } }))
  return (
    <Form form={form}>
      <ArrayField name="contacts">
        {field => (
          <ArrayBase>
            {field.value.map((record: unknown, index: number) => (
              <ArrayBase.Item key={index} index={index} record={record}>
                <ItemHeader />
                <FormLayout mode="card">
                  <Field name={`${index}.name`} title="姓名" required decorator={[FormItem]} component={[Input, { placeholder: '请输入姓名' }]} />
                </FormLayout>
              </ArrayBase.Item>
            ))}
            <ArrayBase.Addition title="添加联系人" defaultValue={{ name: '' }} />
          </ArrayBase>
        )}
      </ArrayField>
      <FormButtonGroup><Submit onSubmit={onSubmit}>提交</Submit></FormButtonGroup>
    </Form>
  )
}
