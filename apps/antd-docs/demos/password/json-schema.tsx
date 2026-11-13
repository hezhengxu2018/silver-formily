import { FormButtonGroup, FormItem, FormLayout, Password, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'

const SchemaField = createSchemaField({
  components: {
    Password,
    FormItem,
  },
})

const schema = {
  type: 'object',
  properties: {
    input: {
      'type': 'string',
      'title': '输入框',
      'x-decorator': 'FormItem',
      'x-component': 'Password',
      'x-component-props': {
        style: {
          width: 240,
        },
      },
    },
  },
}

const form = createForm()

export default function Demo() {
  return (
    <FormProvider form={form}>
      <FormLayout labelCol={6} wrapperCol={10}>
        <SchemaField schema={schema} />
        <FormButtonGroup.FormItem>
          <Submit onSubmitFailed={console.log} onSubmit={console.log}>提交</Submit>
        </FormButtonGroup.FormItem>
      </FormLayout>
    </FormProvider>
  )
}
