import { FormButtonGroup, FormItem, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({
  initialValues: {
    username: '张三',
  },
})

export default function InputBasic() {
  return (
    <FormProvider form={form}>
      <Field
        name="username"
        title="用户名"
        required
        decorator={[FormItem]}
        component={[Input]}
      />
      <Field
        name="phone"
        title="手机号"
        decorator={[FormItem]}
        component={[Input, {
          type: 'tel',
          placeholder: '请输入手机号',
        }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
