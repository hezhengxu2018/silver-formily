import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'
import { Input } from 'antd'

const form = createForm()

// createSchemaField 返回的 SchemaField 上挂载了各 Markup 子组件
const SchemaField = createSchemaField({
  components: {
    Input,
  },
})

export default function Demo() {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String name="input" x-component="Input" />
      </SchemaField>
    </FormProvider>
  )
}
