import { DatePicker, Form, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField } from '@silver-formily/react'
import { useState } from 'react'

const SchemaField = createSchemaField({ components: { DatePicker, FormItem } })

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
        'date': { 'type': 'string', 'title': '普通日期', 'x-decorator': 'FormItem', 'x-component': 'DatePicker', 'x-component-props': {} },
        'week': { 'type': 'string', 'title': '周选择', 'x-decorator': 'FormItem', 'x-component': 'DatePicker', 'x-component-props': { picker: 'week' } },
        'month': { 'type': 'string', 'title': '月选择', 'x-decorator': 'FormItem', 'x-component': 'DatePicker', 'x-component-props': { picker: 'month' } },
        'quarter': { 'type': 'string', 'title': '季度选择', 'x-decorator': 'FormItem', 'x-component': 'DatePicker', 'x-component-props': { picker: 'quarter' } },
        'year': { 'type': 'string', 'title': '年选择', 'x-decorator': 'FormItem', 'x-component': 'DatePicker', 'x-component-props': { picker: 'year' } },
        '[startDate,endDate]': { 'type': 'array', 'title': '日期时间范围', 'x-decorator': 'FormItem', 'x-component': 'DatePicker.RangePicker', 'x-component-props': { showTime: true } },
        'range_week': { 'type': 'array', 'title': '周范围选择', 'x-decorator': 'FormItem', 'x-component': 'DatePicker.RangePicker', 'x-component-props': { picker: 'week' } },
        'range_month': { 'type': 'array', 'title': '月范围选择', 'x-decorator': 'FormItem', 'x-component': 'DatePicker.RangePicker', 'x-component-props': { picker: 'month' } },
        'range_quarter': { 'type': 'array', 'title': '季度范围选择', 'x-decorator': 'FormItem', 'x-component': 'DatePicker.RangePicker', 'x-component-props': { picker: 'quarter' } },
        'range_year': { 'type': 'array', 'title': '年范围选择', 'x-decorator': 'FormItem', 'x-component': 'DatePicker.RangePicker', 'x-component-props': { picker: 'year' } },
      } }}
      />
      <FormButtonGroup.FormItem>
        <Submit onSubmit={onSubmit} onSubmitFailed={onSubmitFailed}>提交</Submit>
      </FormButtonGroup.FormItem>
    </Form>
  )
}
