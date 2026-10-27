import { FormButtonGroup, FormItem, Stepper, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({ initialValues: { weight: 1.5, price: 2.35, precise: '0.123456789012345678' } })

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field
        name="weight"
        title="重量"
        decorator={[FormItem]}
        component={[Stepper, { min: 0, step: 0.5, digits: 1 }]}
      />
      <Field
        name="price"
        title="价格"
        decorator={[FormItem]}
        component={[Stepper, {
          min: 0,
          step: 0.01,
          digits: 2,
          formatter: (value?: number) => `${value ?? 0} 元`,
          parser: (text: string) => Number(text.replace(' 元', '')),
        }]}
      />
      <Field
        name="precise"
        title="高精度小数"
        decorator={[FormItem]}
        component={[Stepper, { stringMode: true, step: '0.000000000000000001' }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>查看结果</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
