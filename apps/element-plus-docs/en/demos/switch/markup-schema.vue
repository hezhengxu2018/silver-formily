<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, Submit, Switch } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaBooleanField } = createSchemaField({
  components: {
    FormItem,
    Switch,
  },
})

function log(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaBooleanField
        name="switch"
        title="Switch"
        x-decorator="FormItem"
        x-component="Switch"
      />
    </SchemaField>
    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>



