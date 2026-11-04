import { CheckList, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

const form = createForm({ initialValues: { plan: ['standard'] } })

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

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
        <Submit onSubmit={onSubmit}>查看结果</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
