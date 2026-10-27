import { FormButtonGroup, FormItem, Reset, Segmented, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { useState } from 'react'
import { showDemoResult } from '../shared'

export default function SegmentedAppearance() {
  const [form] = useState(() => createForm({ initialValues: { level: 2 } }))
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
        <Submit onSubmit={showDemoResult}>查看结果</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </FormProvider>
  )
}
