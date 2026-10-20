import { FormButtonGroup, FormItem, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm()

export default function FormItemBasic() {
  return (
    <FormProvider form={form}>
      <Field
        name="username"
        title="用户名"
        required
        decorator={[FormItem, { help: <span>帮助文案会一直展示在表单项下方</span>, asterisk: false }]}
        component={[Input, { placeholder: '请输入用户名' }]}
      />
      <Field
        name="extra"
        title="额外内容"
        decorator={[FormItem, { extra: '右侧补充' }]}
        component={[Input, { placeholder: '请输入补充内容' }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
