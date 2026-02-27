<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, Submit, TimeSelect } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const schema = {
  type: 'object',
  properties: {
    time: {
      'type': 'string',
      'title': '时间',
      'x-decorator': 'FormItem',
      'x-component': 'TimeSelect',
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
    TimeSelect,
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
