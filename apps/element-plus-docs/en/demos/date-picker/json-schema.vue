<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { DatePicker, Form, FormItem, Submit } from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'

const schema = {
  type: 'object',
  properties: {
    date: {
      'type': 'string',
      'title': 'Date',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
    },
    week: {
      'type': 'string',
      'title': 'Week',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'week',
      },
    },
    month: {
      'type': 'string',
      'title': 'Month',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'month',
      },
    },
    year: {
      'type': 'string',
      'title': 'Year',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'year',
      },
    },
    dateTime: {
      'type': 'string',
      'title': 'DateTime',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'datetime',
      },
    },
    dates: {
      'type': 'array',
      'title': 'Multiple Dates',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'dates',
      },
    },
    dateRange: {
      'type': 'string',
      'title': 'Date Range',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'daterange',
      },
    },
    monthRange: {
      'type': 'string',
      'title': 'Month Range',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'monthrange',
      },
    },
    dateTimeRange: {
      'type': 'string',
      'title': 'DateTime Range',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'datetimerange',
      },
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
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
    <SchemaField :schema="schema" />
    <Submit @submit="onSubmit">
      Submit
    </Submit>
  </Form>
</template>



