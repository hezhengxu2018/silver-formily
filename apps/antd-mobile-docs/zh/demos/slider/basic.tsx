import { FormButtonGroup, FormItem, Reset, Slider, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

const form = createForm({ initialValues: { volume: 30 } })

export default function SliderBasic() {
  return (
    <FormProvider form={form}>
      <Field
        name="volume"
        title="音量"
        decorator={[FormItem]}
        component={[Slider, { min: 0, max: 100, step: 5, popover: true }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>查看结果</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </FormProvider>
  )
}
