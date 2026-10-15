import { FormButtonGroup, FormItem, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({
  initialValues: {
    username: '张三',
    address: '杭州市余杭区',
  },
})

export default function FormItemLabel() {
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
        name="address"
        title="地址"
        decorator={[FormItem]}
        component={[Input]}
        x-decorator-props={{
          labelWidth: 96,
          labelAlign: 'left',
        }}
      />
      <Field
        name="remark"
        title="备注"
        decorator={[FormItem]}
        component={[Input]}
        x-decorator-props={{
          tooltip: '一段较长的说明文案，用于演示气泡提示',
          tooltipLayout: 'icon',
        }}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
