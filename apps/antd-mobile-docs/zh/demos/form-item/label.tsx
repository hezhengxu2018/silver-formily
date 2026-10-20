import { FormButtonGroup, FormItem, FormLayout, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm()

export default function FormItemLabel() {
  return (
    <FormProvider form={form}>
      <FormLayout labelWidth={80} labelAlign="left">
        <Field
          name="username"
          title="用户名"
          required
          decorator={[FormItem]}
          component={[Input, { placeholder: '请输入用户名' }]}
        />
        <Field
          name="address"
          title="地址"
          decorator={[FormItem, {
            labelWidth: 120,
            labelAlign: 'right',
          }]}
          component={[Input, { placeholder: '请输入地址' }]}
        />
        <Field
          name="remark"
          title="备注"
          decorator={[FormItem, {
            labelWidth: 120,
            labelAlign: 'left',
            tooltip: '一段较长的说明文案，用于演示气泡提示',
            tooltipLayout: 'icon',
          }]}
          component={[Input, { placeholder: '请输入备注' }]}
        />
      </FormLayout>
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
