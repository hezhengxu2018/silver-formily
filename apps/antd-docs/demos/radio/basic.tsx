import { Form, FormItem, Radio, Reset, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { Button, Space } from 'antd'

import { useState } from 'react'

export default function Demo() {
  const [form] = useState(() => createForm({ initialValues: { value: 'a' } }))
  return (
    <Form form={form} labelCol={6} wrapperCol={16}>
      <Field name="value" title="单选框" decorator={[FormItem]} component={[Radio.Group, { options: [{ label: '选项 A', value: 'a' }, { label: '选项 B', value: 'b' }] }]} />
      <Field name="selected" title="独立单选" decorator={[FormItem]} component={[Radio, { children: '选中' }]} />
      <Space wrap>
        <Button onClick={() => form.setPattern(form.pattern === 'readPretty' ? 'editable' : 'readPretty')}>切换阅读态</Button>
        <Reset>重置</Reset>
        <Submit onSubmit={values => console.log(values)}>提交到控制台</Submit>
      </Space>
    </Form>
  )
}
