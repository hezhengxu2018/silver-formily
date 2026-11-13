import { Form, FormItem, OTP } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'

const form = createForm()

export default function Demo() {
  return (
    <Form form={form} layout="vertical">
      <Field name="uppercase" title="自动转为大写" decorator={[FormItem]} component={[OTP, { formatter: (value: string) => value.toUpperCase() }]} />
      <Field name="digits" title="仅保留数字" decorator={[FormItem]} component={[OTP, { formatter: (value: string) => value.replace(/\D/g, ''), inputMode: 'numeric' }]} />
    </Form>
  )
}
