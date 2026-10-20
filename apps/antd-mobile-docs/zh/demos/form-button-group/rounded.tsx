import { FormButtonGroup, Reset, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { FormProvider } from '@silver-formily/react'
import { useMemo } from 'react'
import { showDemoResult } from '../shared'

export default function RoundedDemo() {
  const form = useMemo(() => createForm({ initialValues: { username: '张三' } }), [])
  return (
    <FormProvider form={form}>
      <FormButtonGroup layout="horizontal" shape="rounded">
        <Reset>重置</Reset>
        <Submit shape="rectangular" onSubmit={showDemoResult} />
      </FormButtonGroup>
    </FormProvider>
  )
}
