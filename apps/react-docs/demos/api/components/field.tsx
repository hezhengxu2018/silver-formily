import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { Input } from 'antd'

const form = createForm({
  initialValues: {
    input: '初始值',
  },
})

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field name="input" component={[Input, { placeholder: '请输入' }]} />
    </FormProvider>
  )
}
