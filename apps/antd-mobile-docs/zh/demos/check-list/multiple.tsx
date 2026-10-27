import { CheckList, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({ initialValues: { services: ['安装', '回收'] } })

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field
        name="services"
        title="附加服务"
        decorator={[FormItem, { layout: 'vertical' }]}
        component={[CheckList, { multiple: true, options: ['安装', '回收', '延保'] }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>查看结果</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
