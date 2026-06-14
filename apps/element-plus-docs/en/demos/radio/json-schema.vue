<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { Form, FormItem, Radio, Submit } from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Radio,
  },
})

const schema = {
  type: 'object',
  properties: {
    radio: {
      'type': 'boolean',
      'title': 'Radio',
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
      'x-component': 'Radio.Group',
      'x-component-props': {
        optionType: 'button',
      },
    },
  },
}

const form = createForm()

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



