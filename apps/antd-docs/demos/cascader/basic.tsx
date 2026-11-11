import { Cascader, Form, FormItem, Reset, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { Button, Space } from 'antd'

import { useState } from 'react'

export default function Demo() {
  const [form] = useState(() => createForm({ initialValues: { value: ['region', 'city'] } }))
  return (
    <Form form={form} labelCol={6} wrapperCol={16}>
      <Field name="value" title="级联选择" decorator={[FormItem]} component={[Cascader, { options: [{ label: '地区', value: 'region', children: [{ label: '城市', value: 'city' }] }] }]} />

      <Space wrap>
        <Button onClick={() => form.setPattern(form.pattern === 'readPretty' ? 'editable' : 'readPretty')}>切换阅读态</Button>
        <Reset>重置</Reset>
        <Submit onSubmit={values => console.log(values)}>提交到控制台</Submit>
      </Space>
    </Form>
  )
}
