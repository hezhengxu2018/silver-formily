import { ArrayItems, Form, FormButtonGroup, FormItem, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { createSchemaField } from '@silver-formily/react'
import { useState } from 'react'
import { showDemoResult } from '../shared'

function ContactTitle() {
  return (
    <>
      联系人
      {ArrayItems.useIndex() + 1}
    </>
  )
}

const SchemaField = createSchemaField({ components: { ArrayItems, FormItem, Input } })

export default function BasicDemo() {
  const [form] = useState(() => createForm({ initialValues: { contacts: [{}] } }))
  return (
    <Form form={form}>
      <SchemaField schema={{
        type: 'object',
        properties: {
          name: { 'type': 'string', 'title': '客户名称', 'x-decorator': 'FormItem', 'x-component': 'Input', 'x-component-props': { placeholder: '请输入客户名称' } },
          contacts: {
            'type': 'array',
            'x-component': 'ArrayItems',
            'items': {
              type: 'object',
              properties: {
                item: {
                  'type': 'void',
                  'x-component': 'ArrayItems.Item',
                  'x-component-props': { title: <ContactTitle />, extra: <ArrayItems.Remove aria-label="删除联系人" /> },
                  'properties': {
                    name: { 'type': 'string', 'title': '姓名', 'required': true, 'x-decorator': 'FormItem', 'x-component': 'Input', 'x-component-props': { placeholder: '请输入姓名' } },
                    address: { 'type': 'string', 'title': '地址', 'x-decorator': 'FormItem', 'x-component': 'Input', 'x-component-props': { placeholder: '请输入地址' } },
                  },
                },
              },
            },
            'properties': {
              addition: { 'type': 'void', 'title': '添加联系人', 'x-component': 'ArrayItems.Addition', 'x-component-props': { defaultValue: { name: '张三' } } },
            },
          },
        },
      }}
      />
      <FormButtonGroup><Submit onSubmit={showDemoResult}>提交</Submit></FormButtonGroup>
    </Form>
  )
}
