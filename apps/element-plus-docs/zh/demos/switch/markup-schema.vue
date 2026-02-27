<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, Submit, Switch } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaBooleanField } = createSchemaField({
  components: {
    FormItem,
    Switch,
  },
})

async function log(value) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaBooleanField
        name="switch"
        title="开关"
        x-decorator="FormItem"
        x-component="Switch"
      />
    </SchemaField>
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
