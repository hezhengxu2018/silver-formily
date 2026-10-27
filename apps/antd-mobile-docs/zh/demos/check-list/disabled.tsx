import { CheckList, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({ initialValues: { delivery: ['express'], services: ['安装'] } })

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field
        name="delivery"
        title="单项禁用"
        decorator={[FormItem, { layout: 'vertical' }]}
        component={[CheckList]}
        dataSource={[
          { label: '快递配送', value: 'express' },
          { label: '到店自提', value: 'pickup' },
          { label: '当日送达（暂不可用）', value: 'today', disabled: true },
        ]}
      />
      <Field
        name="services"
        title="整组禁用"
        decorator={[FormItem, { layout: 'vertical' }]}
        component={[CheckList, { multiple: true, options: ['安装', '回收', '延保'] }]}
        disabled
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>查看结果</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
