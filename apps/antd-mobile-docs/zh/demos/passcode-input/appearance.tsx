import { FormButtonGroup, FormItem, PasscodeInput, Reset, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { useState } from 'react'
import { showDemoResult } from '../shared'

export default function PasscodeInputAppearance() {
  const [form] = useState(() => createForm({ initialValues: { code: '' } }))
  return (
    <FormProvider form={form}>
      <Field
        name="code"
        title="验证码"
        decorator={[FormItem, { layout: 'vertical' }]}
        component={[PasscodeInput, { length: 4, plain: true, seperated: true }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>查看结果</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </FormProvider>
  )
}
