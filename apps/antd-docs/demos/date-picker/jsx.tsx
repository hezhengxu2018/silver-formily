import { DatePicker, Form, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd'
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
      <Field name="date" title="普通日期" decorator={[FormItem]} component={[DatePicker]} />
      <Field name="week" title="周选择" decorator={[FormItem]} component={[DatePicker, { picker: 'week' }]} />
      <Field name="month" title="月选择" decorator={[FormItem]} component={[DatePicker, { picker: 'month' }]} />
      <Field name="quarter" title="季度选择" decorator={[FormItem]} component={[DatePicker, { picker: 'quarter' }]} />
      <Field name="year" title="年选择" decorator={[FormItem]} component={[DatePicker, { picker: 'year' }]} />
      <Field name="[startDate,endDate]" title="日期时间范围" decorator={[FormItem]} component={[DatePicker.RangePicker, { showTime: true }]} />
      <Field name="range_week" title="周范围选择" decorator={[FormItem]} component={[DatePicker.RangePicker, { picker: 'week' }]} />
      <Field name="range_month" title="月范围选择" decorator={[FormItem]} component={[DatePicker.RangePicker, { picker: 'month' }]} />
      <Field name="range_quarter" title="季度范围选择" decorator={[FormItem]} component={[DatePicker.RangePicker, { picker: 'quarter' }]} />
      <Field name="range_year" title="年范围选择" decorator={[FormItem]} component={[DatePicker.RangePicker, { picker: 'year' }]} />
      <FormButtonGroup.FormItem>
        <Submit onSubmit={onSubmit} onSubmitFailed={onSubmitFailed}>提交</Submit>
      </FormButtonGroup.FormItem>
    </Form>
  )
}
