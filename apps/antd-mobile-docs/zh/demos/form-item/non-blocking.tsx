import { FormButtonGroup, FormItem, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm()

export default function NonBlockingValidation() {
  return (
    <FormProvider form={form}>
      <Field
        name="username"
        title="用户名"
        validateFirst={false}
        validator={[
          (value) => {
            if (String(value ?? '').length < 6)
              return '用户名至少 6 个字符'
          },
          (value) => {
            if (String(value ?? '').includes(' '))
              return { type: 'warning', message: '建议用户名不要包含空格' }
          },
        ]}
        decorator={[FormItem]}
        component={[Input, { placeholder: '试试 ab c 或 hello world' }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
