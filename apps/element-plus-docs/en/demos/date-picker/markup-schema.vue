<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { DatePicker, Form, FormItem, Submit } from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaStringField, SchemaArrayField } = createSchemaField({
  components: {
    FormItem,
    DatePicker,
  },
})

async function onSubmit(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <Form :form="form">
    <SchemaField>
      <SchemaStringField
        name="date"
        title="Date"
        x-decorator="FormItem"
        x-component="DatePicker"
      />
      <SchemaStringField
        name="week"
        title="Week"
        x-decorator="FormItem"
        x-component="DatePicker"
        :x-component-props="{
          type: 'week',
        }"
      />
      <SchemaStringField
        name="month"
        title="Month"
        x-decorator="FormItem"
        x-component="DatePicker"
        :x-component-props="{
          type: 'month',
        }"
      />
      <SchemaStringField
        name="year"
        title="Year"
        x-decorator="FormItem"
        x-component="DatePicker"
        :x-component-props="{
          type: 'year',
        }"
      />
      <SchemaStringField
        name="dateTime"
        title="DateTime"
        x-decorator="FormItem"
        x-component="DatePicker"
        :x-component-props="{
          type: 'datetime',
        }"
      />
      <SchemaArrayField
        name="dates"
        title="Multiple Dates"
        x-decorator="FormItem"
        x-component="DatePicker"
        :x-component-props="{
          type: 'dates',
        }"
      />
      <SchemaArrayField
        name="dateRange"
        title="Date Range"
        x-decorator="FormItem"
        x-component="DatePicker"
        :x-component-props="{
          type: 'daterange',
        }"
      />
      <SchemaArrayField
        name="monthRange"
        title="Month Range"
        x-decorator="FormItem"
        x-component="DatePicker"
        :x-component-props="{
          type: 'monthrange',
        }"
      />
      <SchemaArrayField
        name="dateTimeRange"
        title="DateTime Range"
        x-decorator="FormItem"
        x-component="DatePicker"
        :x-component-props="{
          type: 'datetimerange',
        }"
      />
    </SchemaField>
    <Submit @submit="onSubmit">
      Submit
    </Submit>
  </Form>
</template>



