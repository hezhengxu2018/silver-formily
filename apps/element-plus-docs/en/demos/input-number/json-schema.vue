<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, InputNumber, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const schema = {
  type: 'object',
  properties: {
    inputNumber: {
      'type': 'number',
      'title': 'Input',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {
        style: {
          width: '240px',
        },
      },
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    InputNumber,
  },
})

async function onSubmit(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
    <Submit @submit="onSubmit">
      Submit
    </Submit>
  </FormProvider>
</template>



