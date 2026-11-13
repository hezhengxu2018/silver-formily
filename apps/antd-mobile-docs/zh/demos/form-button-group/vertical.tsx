import { FormButtonGroup, Reset, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { FormProvider } from '@silver-formily/react'

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

const form = createForm({ initialValues: { username: '张三' } })

export default function Demo() {
  return (
    <FormProvider form={form}>
      <FormButtonGroup layout="vertical">
        <Reset>重置</Reset>
        <Submit onSubmit={onSubmit} />
      </FormButtonGroup>
    </FormProvider>
  )
}
