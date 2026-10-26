import {
  FormButtonGroup,
  FormItem,
  FormLayout,
  Input,
  Submit,
} from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({
  initialValues: {
    username: '张三',
    address: '杭州市余杭区',
  },
})

export default function FormLayoutColon() {
  return (
    <FormProvider form={form}>
      <FormLayout colon>
        <Field
          name="username"
          title="用户名"
          required
          decorator={[FormItem]}
          component={[Input]}
        />
        <Field
          name="address"
          title="地址"
          decorator={[FormItem, { colon: false }]}
          component={[Input]}
        />
        <FormButtonGroup>
          <Submit onSubmit={showDemoResult}>提交</Submit>
        </FormButtonGroup>
      </FormLayout>
    </FormProvider>
  )
}
