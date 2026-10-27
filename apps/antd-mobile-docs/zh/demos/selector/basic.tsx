import { FormButtonGroup, FormItem, Selector, Submit } from '@silver-formily/antd-mobile'
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
        decorator={[FormItem]}
        component={[Selector, { columns: 3 }]}
        dataSource={[{ label: '标准', value: 'standard' }, { label: '高级', value: 'premium' }, { label: '旗舰', value: 'ultimate', disabled: true }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>查看结果</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
