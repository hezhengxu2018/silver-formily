<script setup lang="ts">
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { ElButton } from 'element-plus'

const { SchemaField } = createSchemaField({
  components: {
    ElButton,
  },
})

const schema = {
  type: 'object',
  properties: {
    button: {
      'type': 'void',
      'x-component': 'ElButton',
      'x-content': '一个普通的按钮',
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
