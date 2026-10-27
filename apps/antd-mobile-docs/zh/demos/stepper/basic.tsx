import { FormButtonGroup, FormItem, Stepper, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({ initialValues: { quantity: 2 } })

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field
        name="quantity"
        title="商品数量"
        decorator={[FormItem]}
        component={[Stepper, { min: 1, max: 10 }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>查看结果</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
