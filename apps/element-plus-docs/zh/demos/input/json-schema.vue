<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, Input, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const schema = {
  type: 'object',
  properties: {
    input: {
      'type': 'string',
      'title': '输入框',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    textarea: {
      'type': 'string',
      'title': '文本框',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
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
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
    <Submit @submit="onSubmit">
      提交
    </Submit>
  </FormProvider>
</template>
