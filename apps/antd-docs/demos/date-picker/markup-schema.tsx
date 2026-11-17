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
      <SchemaField>
        <SchemaField.String name="date" title="普通日期" x-decorator="FormItem" x-component="DatePicker" />
        <SchemaField.String name="week" title="周选择" x-decorator="FormItem" x-component="DatePicker" x-component-props={{ picker: 'week' }} />
        <SchemaField.String name="month" title="月选择" x-decorator="FormItem" x-component="DatePicker" x-component-props={{ picker: 'month' }} />
        <SchemaField.String name="quarter" title="季度选择" x-decorator="FormItem" x-component="DatePicker" x-component-props={{ picker: 'quarter' }} />
        <SchemaField.String name="year" title="年选择" x-decorator="FormItem" x-component="DatePicker" x-component-props={{ picker: 'year' }} />
        <SchemaField.Array name="[startDate,endDate]" title="日期时间范围" x-decorator="FormItem" x-component="DatePicker.RangePicker" x-component-props={{ showTime: true }} />
        <SchemaField.Array name="range_week" title="周范围选择" x-decorator="FormItem" x-component="DatePicker.RangePicker" x-component-props={{ picker: 'week' }} />
        <SchemaField.Array name="range_month" title="月范围选择" x-decorator="FormItem" x-component="DatePicker.RangePicker" x-component-props={{ picker: 'month' }} />
        <SchemaField.Array name="range_quarter" title="季度范围选择" x-decorator="FormItem" x-component="DatePicker.RangePicker" x-component-props={{ picker: 'quarter' }} />
        <SchemaField.Array name="range_year" title="年范围选择" x-decorator="FormItem" x-component="DatePicker.RangePicker" x-component-props={{ picker: 'year' }} />
      </SchemaField>
      <FormButtonGroup.FormItem>
        <Submit onSubmit={onSubmit} onSubmitFailed={onSubmitFailed}>提交</Submit>
      </FormButtonGroup.FormItem>
    </Form>
  )
}
