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
      <SchemaField schema={{ type: 'object', properties: {
        'time': { 'type': 'string', 'title': '时间', 'x-decorator': 'FormItem', 'x-component': 'TimePicker', 'x-component-props': {} },
        '[startTime,endTime]': { 'type': 'array', 'title': '时间范围', 'x-decorator': 'FormItem', 'x-component': 'TimePicker.RangePicker', 'x-component-props': {} },
        'hours': { 'type': 'string', 'title': '12 小时制', 'x-decorator': 'FormItem', 'x-component': 'TimePicker', 'x-component-props': { use12Hours: true, format: 'hh:mm a' } },
        'minutes': { 'type': 'string', 'title': '分钟步长', 'x-decorator': 'FormItem', 'x-component': 'TimePicker', 'x-component-props': { format: 'HH:mm', valueFormat: 'HH:mm', minuteStep: 15 } },
      } }}
      />
      <FormButtonGroup.FormItem>
        <Submit onSubmit={onSubmit} onSubmitFailed={onSubmitFailed}>提交</Submit>
      </FormButtonGroup.FormItem>
    </Form>
  )
}
