<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { Form, FormItem, Segmented, Submit } from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'

const schema = {
  type: 'object',
  properties: {
    segmented: {
      'type': 'string',
      'title': 'Segmented',
      'x-decorator': 'FormItem',
      'x-component': 'Segmented',
      'enum': [
        { label: 'By Day', value: 'day' },
        { label: 'By Week', value: 'week' },
        { label: 'By Month', value: 'month' },
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



