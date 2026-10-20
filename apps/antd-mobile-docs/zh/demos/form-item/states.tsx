import { FormButtonGroup, FormItem, FormLayout, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({
  initialValues: {
    disabled: '暂不可修改',
    readOnly: '可选中复制，不可修改',
    preview: '已保存的资料',
  },
})

export default function FormItemStates() {
  return (
    <FormProvider form={form}>
      <FormLayout labelWidth={80}>
        <Field name="editable" title="正常输入" decorator={[FormItem]} component={[Input, { placeholder: '可以在此输入' }]} />
        <Field
          name="disabled"
          title="禁用状态"
          pattern="disabled"
          decorator={[FormItem, { disabled: true, help: '字段与整行同时禁用。' }]}
          component={[Input, { placeholder: '禁用时不可输入' }]}
        />
        <Field
          name="readOnly"
          title="只读状态"
          pattern="readOnly"
          decorator={[FormItem]}
          component={[Input, { placeholder: '只读内容' }]}
        />
        <Field
          name="preview"
          title="阅读状态"
          pattern="readPretty"
          decorator={[FormItem]}
          component={[Input, { placeholder: '阅读内容' }]}
        />
      </FormLayout>
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
