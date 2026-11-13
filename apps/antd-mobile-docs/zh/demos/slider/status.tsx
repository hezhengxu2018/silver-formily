import { FormItem, Slider } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

const form = createForm({ initialValues: { disabled: 30, readOnly: 30, readPretty: 30 } })

export default function SliderStatus() {
  return (
    <FormProvider form={form}>
      <Field name="disabled" title="禁用" disabled decorator={[FormItem]} component={[Slider, { min: 0, max: 100 }]} />
      <Field name="readOnly" title="只读" readOnly decorator={[FormItem]} component={[Slider, { min: 0, max: 100 }]} />
      <Field name="readPretty" title="阅读态" readPretty decorator={[FormItem]} component={[Slider, { min: 0, max: 100 }]} />
    </FormProvider>
  )
}
