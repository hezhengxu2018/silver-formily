import { FormButtonGroup, FormItem, FormLayout, OTP, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'

const SchemaField = createSchemaField({
  components: {
    OTP,
    FormItem,
  },
})

const schema = {
  type: 'object',
  properties: {
    code: {
      'type': 'string',
      'required': true,
      'x-validator': { pattern: '^[0-9]{6}$', message: '请输入 6 位数字验证码' },
      'title': '验证码',
      'x-decorator': 'FormItem',
      'x-component': 'OTP',
      'x-component-props': {
        length: 6,
        autoComplete: 'one-time-code',
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
