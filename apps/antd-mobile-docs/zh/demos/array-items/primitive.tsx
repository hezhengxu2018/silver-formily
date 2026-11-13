import { ArrayItems, Form, FormButtonGroup, FormItem, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { createSchemaField } from '@silver-formily/react'

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

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

const form = createForm({ initialValues: { tags: ['工作', '生活'] } })

export default function PrimitiveDemo() {
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
      <FormButtonGroup><Submit onSubmit={onSubmit}>提交</Submit></FormButtonGroup>
    </Form>
  )
}
