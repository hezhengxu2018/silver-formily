import {
  FormButtonGroup,
  FormItem,
  FormLayout,
  Input,
  Submit,
} from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { Toast } from 'antd-mobile'

const form = createForm()

export default function SubmitValidate() {
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
          name="email"
          title="邮箱"
          required
          validator="email"
          decorator={[FormItem]}
          component={[Input]}
        />
        <FormButtonGroup>
          <Submit
            onSubmit={values => Toast.show({
              content: `校验通过：${values.username}`,
            })}
            onSubmitFailed={() => Toast.show({
              content: '校验未通过，请检查表单',
            })}
          >
            提交
          </Submit>
        </FormButtonGroup>
      </FormLayout>
    </FormProvider>
  )
}
