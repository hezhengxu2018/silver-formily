<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { DatePicker, Form, FormItem, Submit } from '@silver-formily/element-plus'
import { ArrayField, Field } from '@silver-formily/vue'

const form = createForm()

async function onSubmit(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <Form :form="form">
    <Field
      name="date"
      title="Date"
      :decorator="[FormItem]"
      :component="[DatePicker]"
    />
    <Field
      name="week"
      title="Week"
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
      title="Month"
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
      title="Year"
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
      title="DateTime"
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
      title="Multiple Dates"
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
      title="Date Range"
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
      title="Month Range"
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
      title="DateTime Range"
      :decorator="[FormItem]"
      :component="[
        DatePicker,
        {
          type: 'datetimerange',
        },
      ]"
    />
    <Submit @submit="onSubmit">
      Submit
    </Submit>
  </Form>
</template>



