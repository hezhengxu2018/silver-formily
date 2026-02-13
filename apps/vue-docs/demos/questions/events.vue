<script setup lang="ts">
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { ElInput } from 'element-plus'

const { SchemaField } = createSchemaField({
  components: {
    ElInput,
  },
})

function handleChange(e: unknown) {
  // eslint-disable-next-line no-console
  console.log(e)
}

function handleFocus(e: unknown) {
  // eslint-disable-next-line no-console
  console.log(e)
}

const schema = {
  type: 'object',
  properties: {
    input: {
      'type': 'string',
      'x-component': 'ElInput',
      'x-component-props': {
        '@change': handleChange,
        'onFocus': handleFocus,
      },
    },
  },
}

const form = createForm()
</script>

<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
  </FormProvider>
</template>
