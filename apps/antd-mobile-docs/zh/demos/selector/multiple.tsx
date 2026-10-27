import { FormButtonGroup, FormItem, Selector, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({ initialValues: { services: ['delivery'] } })

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field
        name="services"
        title="附加服务"
        decorator={[FormItem]}
        component={[Selector, { multiple: true, columns: 2, options: [{ label: '配送', value: 'delivery', description: '送货上门' }, { label: '安装', value: 'installation', description: '预约安装' }] }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>查看结果</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
