import { FormButtonGroup, FormItem, Rate, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({ initialValues: { disabled: 3, readOnly: 4, readPretty: 4.5 } })

export default function RateStatus() {
  return (
    <FormProvider form={form}>
      <Field
        name="disabled"
        title="禁用"
        disabled
        decorator={[FormItem]}
        component={[Rate]}
      />
      <Field
        name="readOnly"
        title="只读"
        readOnly
        decorator={[FormItem]}
        component={[Rate]}
      />
      <Field
        name="readPretty"
        title="阅读态"
        readPretty
        decorator={[FormItem]}
        component={[Rate, { allowHalf: true }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>查看结果</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
