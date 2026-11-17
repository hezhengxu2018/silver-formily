import { FormButtonGroup, FormItem, FormLayout, Password, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'

const SchemaField = createSchemaField({
  components: {
    Password,
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

export default function Demo() {
  return (
    <FormProvider form={form}>
      <FormLayout labelCol={6} wrapperCol={10}>
        <SchemaField>
          <SchemaField.String
            name="input"
            title="输入框"
            x-decorator="FormItem"
            x-component="Password"
            required
            x-component-props={{
              style: {
                width: 240,
              },
            }}
          />
        </SchemaField>
        <FormButtonGroup.FormItem>
          <Submit onSubmitFailed={onSubmitFailed} onSubmit={onSubmit}>提交</Submit>
        </FormButtonGroup.FormItem>
      </FormLayout>
    </FormProvider>
  )
}
