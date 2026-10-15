import { FormButtonGroup, FormItem, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm()

export default function FormItemValidation() {
  return (
    <FormProvider form={form}>
      <Field
        name="username"
        title="用户名"
        required
        validator={(value) => {
          if (!value)
            return '请输入用户名'
          if (String(value).length < 3)
            return '用户名至少 3 个字符'
        }}
        decorator={[FormItem]}
        component={[Input]}
      />
      <Field
        name="email"
        title="邮箱"
        required
        validator="email"
        decorator={[FormItem]}
        component={[Input]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
