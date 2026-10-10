import type { ArrayField as ArrayFieldType } from '@silver-formily/core'
import type { Schema } from '@silver-formily/json-schema'
import { createForm } from '@silver-formily/core'
import {
  createSchemaField,
  FormProvider,
  observer,
  RecursionField,
  useField,
  useFieldSchema,
} from '@silver-formily/react'
import '../../demoStyles.css'

const form = createForm()

function Input(props: { value?: string, onChange?: (value: string) => void }) {
  return (
    <input
      className="demoInput"
      value={props.value ?? ''}
      onChange={(event) => {
        props.onChange?.(event.target.value)
      }}
    />
  )
}

// 自增列表组件：读取当前字段实例与 schema，用 RecursionField 递归渲染 items
const ArrayList = observer(() => {
  const field = useField<ArrayFieldType>()
  const schema = useFieldSchema()
  const itemSchema = schema?.items
  const normalizedItemSchema = (Array.isArray(itemSchema) ? itemSchema[0] : itemSchema) as Schema
  return (
    <div>
      {field.value?.map((_, index) => (
        <div className="demoFormRow" key={index}>
          <RecursionField name={index} schema={normalizedItemSchema} />
          <button className="demoButton secondary" onClick={() => field.remove(index)}>
            删除
          </button>
        </div>
      ))}
      <button className="demoButton" onClick={() => field.push('')}>新增一行</button>
    </div>
  )
})

const SchemaField = createSchemaField({
  components: {
    ArrayList,
    Input,
  },
})

export default function Demo() {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Array name="list" x-component="ArrayList">
          <SchemaField.Object>
            <SchemaField.String name="input" x-component="Input" />
          </SchemaField.Object>
        </SchemaField.Array>
      </SchemaField>
    </FormProvider>
  )
}
