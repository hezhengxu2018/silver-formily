import { Form, FormButtonGroup, FormItem, Submit, TimePicker } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { useState } from 'react'

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

function onSubmitFailed(feedbacks: unknown) {
  return Prompts.alert(JSON.stringify(feedbacks, null, 2))
}

export default function Demo() {
  const [form] = useState(() => createForm())

  return (
    <Form form={form} labelCol={6} wrapperCol={16}>
      <Field name="time" title="时间" decorator={[FormItem]} component={[TimePicker]} />
      <Field name="[startTime,endTime]" title="时间范围" decorator={[FormItem]} component={[TimePicker.RangePicker]} />
      <Field name="hours" title="12 小时制" decorator={[FormItem]} component={[TimePicker, { use12Hours: true, format: 'hh:mm a' }]} />
      <Field name="minutes" title="分钟步长" decorator={[FormItem]} component={[TimePicker, { format: 'HH:mm', valueFormat: 'HH:mm', minuteStep: 15 }]} />
      <FormButtonGroup.FormItem>
        <Submit onSubmit={onSubmit} onSubmitFailed={onSubmitFailed}>提交</Submit>
      </FormButtonGroup.FormItem>
    </Form>
  )
}
