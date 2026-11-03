import { Form, FormButtonGroup, FormItem, Input, Reset, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { useState } from 'react'
import { DemoConfig, Result } from './_shared'

export default function Demo() {
  const [form] = useState(() => createForm({ initialValues: { name: '张三' } }))
  const [result, setResult] = useState<unknown>()
  return (
    <DemoConfig>
      <Form form={form} labelCol={5} wrapperCol={17} onAutoSubmit={setResult} onAutoSubmitFailed={() => {}}>
        <Field name="name" title="姓名" required decorator={[FormItem, { labelFor: 'basic-name' }]} component={[Input, { id: 'basic-name', placeholder: '请输入姓名' }]} />
        <FormButtonGroup.FormItem>
          <Submit />
          <Reset />
        </FormButtonGroup.FormItem>
      </Form>
      <Result value={result} />
    </DemoConfig>
  )
}
