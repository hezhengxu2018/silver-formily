import type { ArrayField as ArrayFieldType } from '@silver-formily/core'
import type { Schema } from '@silver-formily/json-schema'
import { createForm, isArrayField } from '@silver-formily/core'
import {
  createSchemaField,
  FormProvider,
  observer,
  RecursionField,
  useField,
  useFieldSchema,
} from '@silver-formily/react'
import { Button, Input, Space } from 'antd'

const form = createForm()

// 自增列表组件：读取当前字段实例与 schema，用 RecursionField 递归渲染 items
const ArrayItems = observer(() => {
  const field = useField<ArrayFieldType>()
  const schema = useFieldSchema()

  function handleAdd() {
    if (isArrayField(field)) {
      field.push({ id: Date.now() })
    }
  }

  const itemSchema = schema?.items
  const normalizedItemSchema = (Array.isArray(itemSchema) ? itemSchema[0] : itemSchema) as Schema
  const items = isArrayField(field) && Array.isArray(field.value)
    ? field.value.map((item, index) => (
        <div key={item.id ?? index} style={{ marginBottom: 10 }}>
          <Space>
            <RecursionField schema={normalizedItemSchema} name={index} />
            <Button onClick={() => field.remove(index)}>
              Remove
            </Button>
          </Space>
        </div>
      ))
    : null

  return (
    <div>
      {items}
      <Button onClick={handleAdd}>Add</Button>
    </div>
  )
})

const SchemaField = createSchemaField({
  components: {
    ArrayItems,
    Input,
  },
})

export default function Demo() {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Array name="custom" x-component="ArrayItems">
          <SchemaField.Object>
            <SchemaField.String name="input" x-component="Input" />
          </SchemaField.Object>
        </SchemaField.Array>
      </SchemaField>
    </FormProvider>
  )
}
