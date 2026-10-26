import { Form, FormButtonGroup, FormItem, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { useMemo } from 'react'
import { showDemoResult } from '../shared'

export default function FormInherited() {
  const form = useMemo(() => createForm({ initialValues: { address: '上海市' } }), [])

  return (
    <FormProvider form={form}>
      <Form layout="vertical" onAutoSubmit={showDemoResult}>
        <Field name="address" title="地址" decorator={[FormItem]} component={[Input]} />
        <FormButtonGroup><Submit>提交地址</Submit></FormButtonGroup>
      </Form>
    </FormProvider>
  )
}
