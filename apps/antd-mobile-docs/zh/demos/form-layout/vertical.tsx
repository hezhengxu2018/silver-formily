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
    remark: '备注信息',
  },
})

export default function FormLayoutVertical() {
  return (
    <FormProvider form={form}>
      <FormLayout layout="vertical">
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
          decorator={[FormItem]}
          component={[Input]}
        />
        <Field
          name="remark"
          title="备注"
          decorator={[FormItem]}
          component={[Input.TextArea]}
        />
        <FormButtonGroup>
          <Submit onSubmit={showDemoResult}>提交</Submit>
        </FormButtonGroup>
      </FormLayout>
    </FormProvider>
  )
}
