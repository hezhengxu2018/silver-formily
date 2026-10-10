import { createForm } from '@silver-formily/core'
import {
  createSchemaField,
  FormProvider,
  useFieldSchema,
} from '@silver-formily/react'
import '../../demoStyles.css'

const form = createForm()

// useFieldSchema 只能在 SchemaField 或 RecursionField 子树内使用
function SchemaPreview() {
  const schema = useFieldSchema()
  return (
    <pre className="demoCode">{JSON.stringify(schema?.toJSON(), null, 2)}</pre>
  )
}

const SchemaField = createSchemaField({
  components: { SchemaPreview },
})

export default function Demo() {
  return (
    <FormProvider form={form}>
      <SchemaField
        schema={{
          type: 'object',
          properties: {
            input: {
              'type': 'string',
              'title': '输入框',
              'x-component': 'SchemaPreview',
            },
          },
        }}
      />
    </FormProvider>
  )
}
