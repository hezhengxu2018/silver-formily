<script lang="ts" setup>
import { createForm } from '@formily/core'
import { Form, FormItem, Segmented, Submit } from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'

const schema = {
  type: 'object',
  properties: {
    segmented: {
      'type': 'string',
      'title': '分段选择',
      'x-decorator': 'FormItem',
      'x-component': 'Segmented',
      'enum': [
        { label: '按天', value: 'day' },
        { label: '按周', value: 'week' },
        { label: '按月', value: 'month' },
      ],
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Segmented,
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
