import { Form, FormItem, OTP } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'

const form = createForm()

export default function Demo() {
  return (
    <Form form={form} layout="vertical">
      <Field name="slash" title="固定分隔符" decorator={[FormItem]} component={[OTP, { separator: <span>/</span> }]} />
      <Field name="grouped" title="每三位分组" decorator={[FormItem]} component={[OTP, { separator: (index: number) => index === 2 ? <span>—</span> : null }]} />
    </Form>
  )
}
