import { Checkbox, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'

const SchemaField = createSchemaField({
  components: {
    Checkbox,
    FormItem,
  },
})

const form = createForm()

export default function Demo() {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Boolean
          name="single"
          title="是否确认"
          x-decorator="FormItem"
          x-component="Checkbox"
        />
        <SchemaField.Array
          name="multiple"
          title="复选"
          enum={[
            {
              label: '选项1',
              value: 1,
            },
            {
              label: '选项2',
              value: 2,
            },
          ]}
          x-decorator="FormItem"
          x-component="Checkbox.Group"
        />
      </SchemaField>
      <FormButtonGroup>
        <Submit onSubmitFailed={console.log} onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
