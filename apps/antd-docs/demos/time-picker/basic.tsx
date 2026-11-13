import { Form, FormItem, Reset, Submit, TimePicker } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { Button, Space } from 'antd'
import dayjs from 'dayjs'

const form = createForm({ initialValues: { value: dayjs('2026-11-06T09:30:00') } })

export default function Demo() {
  return (
    <Form form={form} labelCol={6} wrapperCol={16}>
      <Field name="value" title="时间选择" decorator={[FormItem]} component={[TimePicker, { format: 'HH:mm' }]} />
      <Field name="range" title="范围" decorator={[FormItem]} component={[TimePicker.RangePicker]} />
      <Space wrap>
        <Button onClick={() => form.setPattern(form.pattern === 'readPretty' ? 'editable' : 'readPretty')}>切换阅读态</Button>
        <Reset>重置</Reset>
        <Submit onSubmit={values => console.log(values)}>提交到控制台</Submit>
      </Space>
    </Form>
  )
}
