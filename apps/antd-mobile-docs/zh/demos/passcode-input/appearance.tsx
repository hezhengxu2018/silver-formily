import { FormButtonGroup, FormItem, PasscodeInput, Reset, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

const form = createForm({ initialValues: { code: '' } })

export default function PasscodeInputAppearance() {
  return (
    <FormProvider form={form}>
      <Field
        name="code"
        title="验证码"
        decorator={[FormItem, { layout: 'vertical' }]}
        component={[PasscodeInput, { length: 4, plain: true, seperated: true }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>查看结果</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </FormProvider>
  )
}
