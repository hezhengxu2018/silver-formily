import { Form, FormButtonGroup, FormItem, Submit, TimePicker } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField } from '@silver-formily/react'
import { useState } from 'react'

const SchemaField = createSchemaField({ components: { TimePicker, FormItem } })

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
      <SchemaField>
        <SchemaField.String name="time" title="时间" x-decorator="FormItem" x-component="TimePicker" />
        <SchemaField.Array name="[startTime,endTime]" title="时间范围" x-decorator="FormItem" x-component="TimePicker.RangePicker" />
        <SchemaField.String name="hours" title="12 小时制" x-decorator="FormItem" x-component="TimePicker" x-component-props={{ use12Hours: true, format: 'hh:mm a' }} />
        <SchemaField.String name="minutes" title="分钟步长" x-decorator="FormItem" x-component="TimePicker" x-component-props={{ format: 'HH:mm', valueFormat: 'HH:mm', minuteStep: 15 }} />
      </SchemaField>
      <FormButtonGroup.FormItem>
        <Submit onSubmit={onSubmit} onSubmitFailed={onSubmitFailed}>提交</Submit>
      </FormButtonGroup.FormItem>
    </Form>
  )
}
