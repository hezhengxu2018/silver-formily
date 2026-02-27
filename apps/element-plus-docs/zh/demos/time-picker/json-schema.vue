<script lang="ts" setup>
import { createForm } from '@formily/core'
import { Form, FormItem, Submit, TimePicker } from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'

const schema = {
  type: 'object',
  properties: {
    'time': {
      'type': 'string',
      'title': '时间',
      'x-decorator': 'FormItem',
      'x-component': 'TimePicker',
      'x-component-props': {
        style: {
          width: '240px',
        },
      },
    },
    '[startTime,endTime]': {
      'title': '时间范围',
      'x-decorator': 'FormItem',
      'x-component': 'TimePicker',
      'x-component-props': {
        isRange: true,
        style: {
          width: '240px',
        },
      },
      'type': 'string',
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    TimePicker,
  },
})

async function onSubmit(value) {
  console.log(value)
}
</script>

<template>
  <Form :form="form">
    <SchemaField :schema="schema" />
    <Submit @submit="onSubmit">
      提交
    </Submit>
  </Form>
</template>
