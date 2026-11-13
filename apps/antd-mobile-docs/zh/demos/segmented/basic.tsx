import { FormButtonGroup, FormItem, Reset, Segmented, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

const form = createForm({ initialValues: { period: '周' } })

export default function SegmentedBasic() {
  return (
    <FormProvider form={form}>
      <Field
        name="period"
        title="统计周期"
        decorator={[FormItem]}
        component={[Segmented, { options: ['日', '周', '月'] }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>查看结果</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </FormProvider>
  )
}
