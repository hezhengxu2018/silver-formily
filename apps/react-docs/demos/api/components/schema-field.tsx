import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'
import { Form, Input } from 'antd'

const form = createForm()

// createSchemaField 返回的 SchemaField 上挂载了各 Markup 子组件
const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem: Form.Item,
  },
})

export default function Demo() {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String
          name="input"
          x-decorator="FormItem"
          x-decorator-props={{ label: '输入' }}
          x-component="Input"
          x-component-props={{ placeholder: '请输入' }}
        />
      </SchemaField>
    </FormProvider>
  )
}
