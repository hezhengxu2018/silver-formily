import { FormButtonGroup, FormItem, Rate, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({ initialValues: { score: 3 } })

export default function RateBasic() {
  return (
    <FormProvider form={form}>
      <Field
        name="score"
        title="服务评分"
        decorator={[FormItem]}
        component={[Rate]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>查看结果</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
