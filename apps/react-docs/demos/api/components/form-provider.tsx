import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { Input } from 'antd'

const form = createForm()

export default function Demo() {
  return (
    // FormProvider 负责把 form 实例下发给子树的所有字段组件
    <FormProvider form={form}>
      <Field name="input" component={[Input]} />
    </FormProvider>
  )
}
