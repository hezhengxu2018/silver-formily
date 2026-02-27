<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, InputNumber, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    InputNumber,
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
        title="输入框"
        x-decorator="FormItem"
        x-component="InputNumber"
        :x-component-props="{
          style: {
            width: '240px',
          },
        }"
      />
    </SchemaField>
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
