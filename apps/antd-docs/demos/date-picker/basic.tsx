import { DatePicker, Form, FormItem, Reset, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { Button, Space } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { DemoConfig } from '../_shared'

export default function Demo() {
  const [form] = useState(() => createForm({ initialValues: { value: dayjs('2026-11-06') } }))
  return (
    <DemoConfig>
      <Form form={form} labelCol={6} wrapperCol={16}>
        <Field name="value" title="日期选择" decorator={[FormItem]} component={[DatePicker, { format: 'YYYY-MM-DD' }]} />
        <Field name="range" title="范围" decorator={[FormItem]} component={[DatePicker.RangePicker]} />
        <Space wrap>
          <Button onClick={() => form.setPattern(form.pattern === 'readPretty' ? 'editable' : 'readPretty')}>切换阅读态</Button>
          <Reset>重置</Reset>
          <Submit onSubmit={values => console.log(values)}>提交到控制台</Submit>
        </Space>
      </Form>
    </DemoConfig>
  )
}
