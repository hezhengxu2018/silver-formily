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

export default function FormLayoutSettings() {
  return (
    <FormProvider form={form}>
      <FormLayout
        labelWidth={120}
        labelAlign="right"
        tooltipLayout="text"
      >
        <Field
          name="username"
          title="用户名"
          required
          decorator={[FormItem, { tooltip: '该信息将用于填写个人资料' }]}
          component={[Input, { placeholder: '请输入用户名' }]}
        />
        <Field
          name="address"
          title="地址"
          decorator={[FormItem, { tooltip: '该信息将用于填写个人资料' }]}
          component={[Input, { placeholder: '请输入地址' }]}
        />
        <FormButtonGroup>
          <Submit onSubmit={showDemoResult}>提交</Submit>
        </FormButtonGroup>
      </FormLayout>
    </FormProvider>
  )
}
