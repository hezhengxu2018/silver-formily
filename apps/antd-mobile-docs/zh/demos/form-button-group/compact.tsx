import { FormButtonGroup, Reset, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { FormProvider } from '@silver-formily/react'
import { useMemo } from 'react'

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

export default function Demo() {
  const form = useMemo(() => createForm({ initialValues: { username: '张三' } }), [])
  return (
    <FormProvider form={form}>
      <FormButtonGroup layout="compact" safeAreaInsetBottom>
        <Reset>重置</Reset>
        <Submit onSubmit={onSubmit} />
      </FormButtonGroup>
    </FormProvider>
  )
}
