import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'
import { Input } from 'antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    Input,
  },
})

const schema = {
  type: 'object',
  properties: {
    input: {
      'type': 'string',
      'x-component': 'Input',
    },
  },
}

export default function Demo() {
  return (
    <FormProvider form={form}>
      {/* 直接传入 JSON Schema 对象渲染 */}
      <SchemaField schema={schema} />
    </FormProvider>
  )
}
