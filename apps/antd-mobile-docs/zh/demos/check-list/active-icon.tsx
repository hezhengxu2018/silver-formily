import { CheckList, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { SmileOutline } from 'antd-mobile-icons'
import { showDemoResult } from '../shared'

const form = createForm({ initialValues: { delivery: ['express'] } })

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field
        name="delivery"
        title="配送方式"
        decorator={[FormItem, { layout: 'vertical' }]}
        component={[CheckList, { activeIcon: <SmileOutline /> }]}
        dataSource={[{ label: '快递配送', value: 'express' }, { label: '到店自提', value: 'pickup' }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>查看结果</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
