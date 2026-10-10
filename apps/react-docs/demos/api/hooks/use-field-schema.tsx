import { createForm } from '@silver-formily/core'
import {
  createSchemaField,
  FormProvider,
  useFieldSchema,
} from '@silver-formily/react'

const form = createForm({ validateFirst: true })

// useFieldSchema 只能在 SchemaField 或 RecursionField 子树内使用
function Custom() {
  const schema = useFieldSchema()
  return (
    <div style={{ whiteSpace: 'pre' }}>
      {JSON.stringify(schema?.toJSON(), null, 4)}
    </div>
  )
}

const SchemaField = createSchemaField({
  components: {
    Custom,
  },
})

export default function Demo() {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Object
          name="custom"
          x-component="Custom"
          x-component-props={{
            schema: {
              type: 'object',
              properties: {
                input: {
                  'type': 'string',
                  'x-component': 'Custom',
                },
              },
            },
          }}
        />
      </SchemaField>
    </FormProvider>
  )
}
