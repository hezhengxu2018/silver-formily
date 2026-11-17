import { FormButtonGroup, FormItem, Select, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'

const SchemaField = createSchemaField({
  components: {
    Select,
    FormItem,
  },
})

const form = createForm()

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

function onSubmitFailed(feedbacks: unknown) {
  return Prompts.alert(JSON.stringify(feedbacks, null, 2))
}

export default function OfficialExample() {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Number
          name="select"
          title="选择框"
          x-decorator="FormItem"
          x-component="Select"
          enum={[
            { label: '选项1', value: 1 },
            { label: '选项2', value: 2 },
          ]}
          x-component-props={{
            style: {
              width: 120,
            },
          }}
        />
      </SchemaField>
      <FormButtonGroup>
        <Submit onSubmitFailed={onSubmitFailed} onSubmit={onSubmit}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
