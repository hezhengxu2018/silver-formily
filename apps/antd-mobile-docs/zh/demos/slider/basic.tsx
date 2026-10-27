import { FormButtonGroup, FormItem, Reset, Slider, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { useState } from 'react'
import { showDemoResult } from '../shared'

export default function SliderBasic() {
  const [form] = useState(() => createForm({ initialValues: { volume: 30 } }))
  return (
    <FormProvider form={form}>
      <Field
        name="volume"
        title="音量"
        decorator={[FormItem]}
        component={[Slider, { min: 0, max: 100, step: 5, popover: true }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>查看结果</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </FormProvider>
  )
}
