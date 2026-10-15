import { FormButtonGroup, FormItem, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({
  initialValues: {
    remark: '多行文本',
  },
})

export default function InputTextArea() {
  return (
    <FormProvider form={form}>
      <Field
        name="remark"
        title="备注"
        decorator={[FormItem]}
        component={[Input.TextArea]}
        x-component-props={{
          placeholder: '请输入备注信息',
          maxLength: 100,
          showCount: true,
          autoSize: true,
        }}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
