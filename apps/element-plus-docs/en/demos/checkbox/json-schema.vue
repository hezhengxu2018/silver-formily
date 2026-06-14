<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { Checkbox, Form, FormItem, Submit } from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'

const schema = {
  type: 'object',
  properties: {
    checkbox: {
      'type': 'number',
      'title': 'Confirm',
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox',
    },
    checkboxGroup: {
      'type': 'array',
      'title': 'Checkbox',
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox.Group',
      'enum': [
        {
          label: 'Option 1',
          value: 1,
        },
        {
          label: 'Option 2',
          value: 2,
        },
      ],
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Checkbox,
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



