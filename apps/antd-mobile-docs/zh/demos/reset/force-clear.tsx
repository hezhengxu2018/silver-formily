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

const form = createForm({
  initialValues: {
    username: '张三',
    nickname: '三三',
  },
})

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

export default function ResetForceClear() {
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
          <Reset forceClear validate>
            强制清空
          </Reset>
          <Submit onSubmit={onSubmit}>提交</Submit>
        </FormButtonGroup>
      </FormLayout>
    </FormProvider>
  )
}
