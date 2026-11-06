import { Form, FormItem, Reset, Submit, TreeSelect } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { Button, Space } from 'antd'

import { useState } from 'react'
import { DemoConfig } from '../_shared'

export default function Demo() {
  const [form] = useState(() => createForm({ initialValues: { value: 'city' } }))
  return (
    <DemoConfig>
      <Form form={form} labelCol={6} wrapperCol={16}>
        <Field name="value" title="树选择" decorator={[FormItem]} component={[TreeSelect, { treeData: [{ title: '地区', value: 'region', children: [{ title: '城市', value: 'city' }] }], style: { width: 240 } }]} />

        <Space wrap>
          <Button onClick={() => form.setPattern(form.pattern === 'readPretty' ? 'editable' : 'readPretty')}>切换阅读态</Button>
          <Reset>重置</Reset>
          <Submit onSubmit={values => console.log(values)}>提交到控制台</Submit>
        </Space>
      </Form>
    </DemoConfig>
  )
}
