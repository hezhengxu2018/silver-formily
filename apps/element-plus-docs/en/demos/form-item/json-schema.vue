<script setup lang="ts">
import { createForm } from '@silver-formily/core'
import { Form, FormItem, Input, Submit } from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'

const schema = {
  type: 'object',
  properties: {
    input: {
      'type': 'string',
      'title': 'Input',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Input,
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



