import {
  FormButtonGroup,
  FormItem,
  FormLayout,
  Input,
  Reset,
  Submit,
} from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({
  initialValues: {
    username: '张三',
    nickname: '三三',
  },
})

export default function ResetBasic() {
  return (
    <FormProvider form={form}>
      <FormLayout>
        <Field
          name="username"
          title="用户名"
          required
          decorator={[FormItem]}
          component={[Input]}
        />
        <Field
          name="nickname"
          title="昵称"
          decorator={[FormItem]}
          component={[Input]}
        />
        <FormButtonGroup layout="horizontal">
          <Reset>重置</Reset>
          <Submit onSubmit={showDemoResult}>提交</Submit>
        </FormButtonGroup>
      </FormLayout>
    </FormProvider>
  )
}
