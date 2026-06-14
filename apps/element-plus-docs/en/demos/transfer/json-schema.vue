<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { Form, FormItem, Submit, Transfer } from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'

const schema = {
  type: 'object',
  properties: {
    transfer: {
      'type': 'array',
      'title': 'Transfer',
      'enum': [
        { label: 'Option 1', key: 1 },
        { label: 'Option 2', key: 2 },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Transfer',
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Transfer,
  },
})

async function onSubmit(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <Form :form="form" label-align="left" :label-width="160">
    <SchemaField :schema="schema" />
    <Submit @submit="onSubmit">
      Submit
    </Submit>
  </Form>
</template>



