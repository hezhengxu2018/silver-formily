import { FormButtonGroup, FormItem, Reset, Slider, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { useState } from 'react'
import { showDemoResult } from '../shared'

export default function SliderAppearance() {
  const [form] = useState(() => createForm({ initialValues: { price: [20, 80] } }))
  return (
    <FormProvider form={form}>
      <Field
        name="price"
        title="价格区间"
        decorator={[FormItem]}
        component={[Slider, { range: true, min: 0, max: 100, step: 10, ticks: true, marks: { 0: '0', 50: '50', 100: '100' } }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>查看结果</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </FormProvider>
  )
}
