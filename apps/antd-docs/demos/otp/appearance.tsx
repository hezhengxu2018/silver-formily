import { Form, FormItem, OTP } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'

const form = createForm({ initialValues: { disabled: '123456' } })

export default function Demo() {
  return (
    <Form form={form} layout="vertical">
      <Field name="disabled" title="禁用" disabled decorator={[FormItem]} component={[OTP]} />
      <Field name="long" title="八位输入" decorator={[FormItem]} component={[OTP, { length: 8 }]} />
      <Field name="filled" title="填充外观" decorator={[FormItem]} component={[OTP, { variant: 'filled' }]} />
      <Field name="mask" title="自定义掩码" decorator={[FormItem]} component={[OTP, { mask: '🔒' }]} />
    </Form>
  )
}
