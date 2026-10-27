import { FormItem, PasscodeInput } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { useState } from 'react'

export default function PasscodeInputStatus() {
  const [form] = useState(() => createForm({ initialValues: { disabled: '123456', readOnly: '123456', readPretty: '123456' } }))
  return (
    <FormProvider form={form}>
      <Field name="disabled" title="禁用" disabled decorator={[FormItem, { layout: 'vertical' }]} component={[PasscodeInput, { length: 6 }]} />
      <Field name="readOnly" title="只读" readOnly decorator={[FormItem, { layout: 'vertical' }]} component={[PasscodeInput, { length: 6 }]} />
      <Field name="readPretty" title="阅读态" readPretty decorator={[FormItem, { layout: 'vertical' }]} component={[PasscodeInput, { length: 6 }]} />
    </FormProvider>
  )
}
