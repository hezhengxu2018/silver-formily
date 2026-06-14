<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { Checkbox, Form, FormItem, Submit } from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'

const form = createForm({
  initialValues: {
    single: true,
    multiple: [1],
  },
})
const { SchemaField, SchemaBooleanField, SchemaArrayField } = createSchemaField(
  {
    components: {
      FormItem,
      Checkbox,
    },
  },
)

async function onSubmit(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <Form :form="form">
    <SchemaField>
      <SchemaBooleanField
        name="single"
        title="Confirm"
        x-decorator="FormItem"
        x-component="Checkbox"
      />
      <SchemaArrayField
        name="multiple"
        title="Checkbox"
        :enum="[
          { label: 'Option 1', value: 1 },
          { label: 'Option 2', value: 2 },
        ]"
        x-decorator="FormItem"
        x-component="Checkbox.Group"
      />
    </SchemaField>
    <Submit @submit="onSubmit">
      Submit
    </Submit>
  </Form>
</template>



