<script lang="ts" setup>
import { createForm } from '@formily/core'
import { DatePicker, Form, FormItem, Submit } from '@silver-formily/element-plus'
import { ArrayField, Field } from '@silver-formily/vue'

const form = createForm()

async function onSubmit(value) {
  console.log(value)
}
</script>

<template>
  <Form :form="form">
    <Field
      name="date"
      title="普通日期"
      :decorator="[FormItem]"
      :component="[DatePicker]"
    />
    <Field
      name="week"
      title="周"
      :decorator="[FormItem]"
      :component="[
        DatePicker,
        {
          type: 'week',
        },
      ]"
    />
    <Field
      name="month"
      title="月"
      :decorator="[FormItem]"
      :component="[
        DatePicker,
        {
          type: 'month',
        },
      ]"
    />
    <Field
      name="year"
      title="年"
      :decorator="[FormItem]"
      :component="[
        DatePicker,
        {
          type: 'year',
        },
      ]"
    />
    <Field
      name="dateTime"
      title="日期时间"
      :decorator="[FormItem]"
      :component="[
        DatePicker,
        {
          type: 'datetime',
        },
      ]"
    />
    <ArrayField
      name="dates"
      title="多个日期"
      :decorator="[FormItem]"
      :component="[
        DatePicker,
        {
          type: 'dates',
        },
      ]"
    />
    <ArrayField
      name="dateRange"
      title="日期范围"
      :decorator="[FormItem]"
      :component="[
        DatePicker,
        {
          type: 'daterange',
        },
      ]"
    />
    <ArrayField
      name="monthRange"
      title="月范围"
      :decorator="[FormItem]"
      :component="[
        DatePicker,
        {
          type: 'monthrange',
        },
      ]"
    />
    <ArrayField
      name="dateTimeRange"
      title="日期时间范围"
      :decorator="[FormItem]"
      :component="[
        DatePicker,
        {
          type: 'datetimerange',
        },
      ]"
    />
    <Submit @submit="onSubmit">
      提交
    </Submit>
  </Form>
</template>
