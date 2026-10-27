import { CheckList, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({ initialValues: { services: ['安装'], frozen: ['安装'] } })

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field
        name="services"
        title="附加服务"
        decorator={[FormItem]}
        component={[CheckList, { multiple: true, options: ['安装', '回收', '延保'] }]}
      />
      <Field
        name="frozen"
        title="只读列表"
        decorator={[FormItem]}
        component={[CheckList, { options: ['安装', '回收'] }]}
        readOnly
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>查看结果</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
