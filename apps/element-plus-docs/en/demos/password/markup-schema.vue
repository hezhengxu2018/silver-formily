<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, Password, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Password,
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
        name="password"
        title="Password Input"
        x-decorator="FormItem"
        x-component="Password"
      />
    </SchemaField>
    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>



