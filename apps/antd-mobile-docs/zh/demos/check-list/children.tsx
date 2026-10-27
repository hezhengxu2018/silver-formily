import { CheckList, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({ initialValues: { plan: ['standard'] } })

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field
        name="plan"
        title="套餐"
        decorator={[FormItem, { layout: 'vertical' }]}
        component={[CheckList]}
      >
        <CheckList.Item value="standard" description="适合日常使用">标准套餐</CheckList.Item>
        <CheckList.Item value="premium" description="包含更多服务">高级套餐</CheckList.Item>
      </Field>
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>查看结果</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
