import { FormButtonGroup, FormItem, Selector, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({ initialValues: { frozen: ['standard'], preview: ['premium'] } })

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field
        name="frozen"
        title="禁用"
        decorator={[FormItem]}
        component={[Selector]}
        disabled
        dataSource={[{ label: '标准', value: 'standard' }, { label: '高级', value: 'premium' }, { label: '旗舰', value: 'ultimate', disabled: true }]}
      />
      <Field
        name="preview"
        title="阅读态"
        decorator={[FormItem]}
        component={[Selector]}
        readPretty
        dataSource={[{ label: '标准', value: 'standard' }, { label: '高级', value: 'premium' }, { label: '旗舰', value: 'ultimate', disabled: true }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>查看结果</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
