import { FormButtonGroup, FormItem, Reset, Segmented, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

const form = createForm({ initialValues: { level: 2 } })

export default function SegmentedAppearance() {
  return (
    <FormProvider form={form}>
      <Field
        name="level"
        title="服务等级"
        dataSource={[{ label: '基础', value: 1 }, { label: '专业', value: 2 }, { label: '企业', value: 3, disabled: true }]}
        decorator={[FormItem]}
        component={[Segmented, { block: true }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>查看结果</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </FormProvider>
  )
}
