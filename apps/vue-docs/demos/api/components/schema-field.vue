<script setup>
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { ElInput } from 'element-plus'

const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    ElInput,
  },
})

const form = createForm()
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField name="input" x-component="ElInput" />
    </SchemaField>
  </FormProvider>
</template>
