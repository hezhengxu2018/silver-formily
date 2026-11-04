import { FormButtonGroup, FormItem, Rate, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

const form = createForm({ initialValues: { score: 3 } })

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

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
        <Submit onSubmit={onSubmit}>查看结果</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
