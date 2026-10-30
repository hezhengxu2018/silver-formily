import { ArrayItems, Form, FormButtonGroup, FormItem, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { createSchemaField } from '@silver-formily/react'
import { useState } from 'react'
import { showDemoResult } from '../shared'

function Actions() {
  return (
    <>
      <ArrayItems.MoveUp aria-label="上移" />
      <ArrayItems.MoveDown aria-label="下移" />
      <ArrayItems.Remove aria-label="删除" />
    </>
  )
}

const SchemaField = createSchemaField({ components: { ArrayItems, FormItem, Input } })

export default function PrimitiveDemo() {
  const [form] = useState(() => createForm({ initialValues: { tags: ['工作', '生活'] } }))
  return (
    <Form form={form}>
      <SchemaField>
        <SchemaField.Array name="tags" x-component="ArrayItems">
          <SchemaField.Void
            x-component="ArrayItems.Item"
            x-component-props={{ mode: 'default', title: <ArrayItems.Index />, extra: <Actions /> }}
          >
            <SchemaField.String
              name="input"
              title="标签"
              x-decorator="FormItem"
              x-component="Input"
              x-component-props={{ placeholder: '请输入标签' }}
            />
          </SchemaField.Void>
          <SchemaField.Void title="添加标签" x-component="ArrayItems.Addition" x-component-props={{ defaultValue: '新标签' }} />
        </SchemaField.Array>
      </SchemaField>
      <FormButtonGroup><Submit onSubmit={showDemoResult}>提交</Submit></FormButtonGroup>
    </Form>
  )
}
