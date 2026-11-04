import { CheckList, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { CheckCircleFill, CheckCircleOutline } from 'antd-mobile-icons'

const form = createForm({ initialValues: { delivery: ['express'] } })

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field
        name="delivery"
        title="配送方式"
        decorator={[FormItem, { layout: 'vertical' }]}
        component={[
          CheckList,
          { extra: (active: boolean) => active ? <CheckCircleFill /> : <CheckCircleOutline /> },
        ]}
        dataSource={[{ label: '快递配送', value: 'express' }, { label: '到店自提', value: 'pickup' }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>查看结果</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
