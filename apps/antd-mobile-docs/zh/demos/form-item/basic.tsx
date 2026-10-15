import { FormButtonGroup, FormItem, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({
  initialValues: {
    username: '张三',
  },
})

export default function FormItemBasic() {
  return (
    <FormProvider form={form}>
      <Field
        name="username"
        title="用户名"
        required
        decorator={[FormItem]}
        component={[Input]}
        x-decorator-props={{ help: '帮助文案会一直展示在表单项下方' }}
      />
      <Field
        name="extra"
        title="额外内容"
        decorator={[FormItem]}
        component={[Input]}
        x-decorator-props={{ extra: '右侧补充' }}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
