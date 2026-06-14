<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, Submit, Transfer } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Transfer,
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
        title="Radio"
        x-decorator="FormItem"
        x-component="Transfer"
        :enum="[
          {
            label: 'Option 1',
            key: 1,
          },
          {
            label: 'Option 2',
            key: 2,
          },
        ]"
      />
    </SchemaField>
    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>



