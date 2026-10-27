import { FormButtonGroup, FormItem, Reset, Segmented, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { useState } from 'react'
import { showDemoResult } from '../shared'

export default function SegmentedBasic() {
  const [form] = useState(() => createForm({ initialValues: { period: '周' } }))
  return (
    <FormProvider form={form}>
      <Field
        name="period"
        title="统计周期"
        decorator={[FormItem]}
        component={[Segmented, { options: ['日', '周', '月'] }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>查看结果</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </FormProvider>
  )
}
