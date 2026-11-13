import { FormButtonGroup, FormItem, FormLayout, OTP, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

const form = createForm()

export default function Demo() {
  return (
    <FormProvider form={form}>
      <FormLayout labelCol={6} wrapperCol={10}>
        <Field
          name="code"
          title="验证码"
          required
          validator={{ pattern: '^[0-9]{6}$', message: '请输入 6 位数字验证码' }}
          decorator={[FormItem]}
          component={[
            OTP,
            {
              length: 6,
              autoComplete: 'one-time-code',
            },
          ]}
        />
        <FormButtonGroup.FormItem>
          <Submit onSubmitFailed={console.log} onSubmit={console.log}>提交</Submit>
        </FormButtonGroup.FormItem>
      </FormLayout>
    </FormProvider>
  )
}
