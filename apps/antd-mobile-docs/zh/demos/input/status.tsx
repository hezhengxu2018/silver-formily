import { FormButtonGroup, FormItem, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({
  initialValues: {
    username: '张三',
  },
})

export default function InputStatus() {
  return (
    <FormProvider form={form}>
      <Field
        name="username"
        title="可清除"
        decorator={[FormItem]}
        component={[Input]}
        x-component-props={{ clearable: true }}
      />
      <Field
        name="readonly"
        title="只读"
        decorator={[FormItem]}
        component={[Input]}
        readOnly
      />
      <Field
        name="disabled"
        title="禁用"
        decorator={[FormItem]}
        component={[Input]}
        disabled
        x-component-props={{ value: '不可编辑' }}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
