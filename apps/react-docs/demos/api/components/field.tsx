import type { ReactNode } from 'react'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { Input } from 'antd'
import { StrictMode, useState } from 'react'

function Decorator({ content, children }: { content?: ReactNode, children?: ReactNode }) {
  return (
    <label>
      {children}
      <small>{content}</small>
    </label>
  )
}

export default function Demo() {
  const [form] = useState(() => createForm({
    initialValues: { input: '初始值' },
  }))
  return (
    <StrictMode>
      <FormProvider form={form}>
        <Field
          name="input"
          component={[Input, { placeholder: '请输入' }]}
          decorator={[Decorator]}
          decoratorContent={['提示：', <span key="help">请输入内容</span>]}
        />
        <Field name="zero" content={0} />
      </FormProvider>
    </StrictMode>
  )
}
