import { Form, FormItem, Input, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { useState } from 'react'
import { DemoConfig } from './_shared'

export default function Demo() {
  const [form] = useState(() => createForm())
  return (
    <DemoConfig>
      <Form form={form} labelWidth={100} fullness onAutoSubmitFailed={() => {}}>
        <Field name="email" title="邮箱" required description="提交时检查邮箱格式" validator={{ format: 'email', message: '请输入有效的邮箱地址' }} decorator={[FormItem, { tooltip: '用于接收通知', labelFor: 'demo-email' }]} component={[Input, { id: 'demo-email', placeholder: 'name@example.com' }]} />
        <Field name="notes" title="长标签会自动省略并提供完整提示" decorator={[FormItem]} component={[Input.TextArea, { placeholder: '补充说明' }]} />
        <Submit>校验并提交</Submit>
      </Form>
    </DemoConfig>
  )
}
