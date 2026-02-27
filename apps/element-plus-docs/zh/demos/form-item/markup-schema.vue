<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormItem, Input, Submit } from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

async function onSubmit(value) {
  console.log(value)
}
</script>

<template>
  <Form :form="form">
    <SchemaField>
      <SchemaStringField
        name="input"
        title="输入框"
        x-decorator="FormItem"
        x-component="Input"
        required
      />
    </SchemaField>
    <Submit @submit="onSubmit">
      提交
    </Submit>
  </Form>
</template>
