import { FormButtonGroup, FormItem, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

const form = createForm({
  initialValues: {
    username: '张三',
    disabled: '不可编辑',
  },
})

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

export default function InputStatus() {
  return (
    <FormProvider form={form}>
      <Field
        name="username"
        title="可清除"
        decorator={[FormItem]}
        component={[Input, { clearable: true }]}
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
      />
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
