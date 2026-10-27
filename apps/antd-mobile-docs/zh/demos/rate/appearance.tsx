import { FormButtonGroup, FormItem, Rate, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({ initialValues: { half: 2.5, custom: 3 } })

export default function RateAppearance() {
  return (
    <FormProvider form={form}>
      <Field
        name="half"
        title="半星评分"
        decorator={[FormItem]}
        component={[Rate, { allowHalf: true, allowClear: false }]}
      />
      <Field
        name="custom"
        title="推荐程度"
        decorator={[FormItem]}
        component={[Rate, {
          count: 6,
          character: '♥',
          style: { '--star-size': '28px', '--active-color': '#ff4d6a' },
        }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>查看结果</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
