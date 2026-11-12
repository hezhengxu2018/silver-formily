import { FormItem, FormLayout, Input, Select } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
    Select,
    FormItem,
    FormLayout,
  },
})

const form = createForm()

export default function OfficialExample() {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Void
          x-component="FormLayout"
          x-component-props={{
            labelCol: 6,
            wrapperCol: 10,
          }}
        >
          <SchemaField.String
            name="input"
            title="输入框"
            x-decorator="FormItem"
            x-decorator-props={{
              tooltip: <div>123</div>,
            }}
            x-component="Input"
            required
          />
          <SchemaField.String
            name="select"
            title="选择框"
            x-decorator="FormItem"
            x-component="Select"
            required
          />
        </SchemaField.Void>
      </SchemaField>
    </FormProvider>
  )
}
