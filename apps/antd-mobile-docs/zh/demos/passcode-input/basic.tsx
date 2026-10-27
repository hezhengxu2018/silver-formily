import { FormButtonGroup, FormItem, PasscodeInput, Reset, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { useState } from 'react'
import { showDemoResult } from '../shared'

export default function PasscodeInputBasic() {
  const [form] = useState(() => createForm({ initialValues: { password: '' } }))
  return (
    <FormProvider form={form}>
      <Field
        name="password"
        title="支付密码"
        decorator={[FormItem, { layout: 'vertical' }]}
        component={[PasscodeInput, { length: 6 }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>查看结果</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </FormProvider>
  )
}
