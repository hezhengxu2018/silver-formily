import { FormButtonGroup, FormItem, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

const form = createForm()

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

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
        <Submit onSubmit={onSubmit}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
