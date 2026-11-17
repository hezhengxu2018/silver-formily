import { FormButtonGroup, FormItem, FormLayout, OTP, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'

const SchemaField = createSchemaField({
  components: {
    OTP,
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
            name="code"
            title="验证码"
            x-decorator="FormItem"
            x-component="OTP"
            required
            x-validator={{ pattern: '^[0-9]{6}$', message: '请输入 6 位数字验证码' }}
            x-component-props={{
              length: 6,
              autoComplete: 'one-time-code',
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
