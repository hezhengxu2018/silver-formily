<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, Input, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const schema = {
  type: 'object',
  properties: {
    input: {
      'type': 'string',
      'title': 'Input',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    textarea: {
      'type': 'string',
      'title': 'Text Input',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
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
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
    <Submit @submit="onSubmit">
      Submit
    </Submit>
  </FormProvider>
</template>



