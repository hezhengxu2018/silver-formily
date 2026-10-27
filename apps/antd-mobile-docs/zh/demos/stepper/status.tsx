import { FormButtonGroup, FormItem, Stepper, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({ initialValues: { disabled: 2, inputOnly: 3, preview: 4 } })

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field
        name="disabled"
        title="禁用"
        decorator={[FormItem]}
        component={[Stepper]}
        disabled
      />
      <Field
        name="inputOnly"
        title="禁止键入"
        decorator={[FormItem]}
        component={[Stepper, { inputReadOnly: true }]}
      />
      <Field
        name="preview"
        title="阅读态"
        decorator={[FormItem]}
        component={[Stepper]}
        readPretty
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>查看结果</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
