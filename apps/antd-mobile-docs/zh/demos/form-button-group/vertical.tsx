import { FormButtonGroup, Reset, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { FormProvider } from '@silver-formily/react'
import { useMemo } from 'react'
import { showDemoResult } from '../shared'

export default function Demo() {
  const form = useMemo(() => createForm({ initialValues: { username: '张三' } }), [])
  return (
    <FormProvider form={form}>
      <FormButtonGroup layout="vertical">
        <Reset>重置</Reset>
        <Submit onSubmit={showDemoResult} />
      </FormButtonGroup>
    </FormProvider>
  )
}
