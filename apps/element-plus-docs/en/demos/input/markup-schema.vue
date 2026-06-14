<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, Input, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

function log(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="input"
        title="Input"
        x-decorator="FormItem"
        x-component="Input"
      />
      <SchemaStringField
        name="textarea"
        title="Text Input"
        x-decorator="FormItem"
        x-component="Input.TextArea"
      />
    </SchemaField>
    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>



