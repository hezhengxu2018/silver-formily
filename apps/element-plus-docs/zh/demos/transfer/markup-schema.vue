<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, Submit, Transfer } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Transfer,
  },
})

async function log(value) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="input"
        title="单选"
        x-decorator="FormItem"
        x-component="Transfer"
        :enum="[
          {
            label: '选项1',
            key: 1,
          },
          {
            label: '选项2',
            key: 2,
          },
        ]"
      />
    </SchemaField>
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
