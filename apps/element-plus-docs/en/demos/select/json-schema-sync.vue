<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { Form, FormItem, Select, Submit } from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'

const schema = {
  type: 'object',
  properties: {
    select: {
      'type': 'string',
      'title': 'Select',
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
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        style: 'width: 240px;',
      },
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Select,
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



