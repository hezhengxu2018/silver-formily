import { Form, FormItem, Rate, Reset, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { Button, Space } from 'antd'

import { useState } from 'react'
import { DemoConfig } from '../_shared'

export default function Demo() {
  const [form] = useState(() => createForm({ initialValues: { value: 0 } }))
  return (
    <DemoConfig>
      <Form form={form} labelCol={6} wrapperCol={16}>
        <Field name="value" title="评分" decorator={[FormItem]} component={[Rate, { allowHalf: true }]} />

        <Space wrap>
          <Button onClick={() => form.setPattern(form.pattern === 'readPretty' ? 'editable' : 'readPretty')}>切换阅读态</Button>
          <Reset>重置</Reset>
          <Submit onSubmit={values => console.log(values)}>提交到控制台</Submit>
        </Space>
      </Form>
    </DemoConfig>
  )
}
