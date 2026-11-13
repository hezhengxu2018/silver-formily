import { FormItem, Segmented } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

const form = createForm({ initialValues: { disabled: '周', readOnly: '周', readPretty: '周' } })

export default function SegmentedStatus() {
  return (
    <FormProvider form={form}>
      <Field name="disabled" title="禁用" disabled decorator={[FormItem]} component={[Segmented, { options: ['日', '周', '月'] }]} />
      <Field name="readOnly" title="只读" readOnly decorator={[FormItem]} component={[Segmented, { options: ['日', '周', '月'] }]} />
      <Field name="readPretty" title="阅读态" readPretty decorator={[FormItem]} component={[Segmented, { options: ['日', '周', '月'] }]} />
    </FormProvider>
  )
}
