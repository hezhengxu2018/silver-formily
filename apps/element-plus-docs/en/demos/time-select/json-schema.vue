<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, Submit, TimeSelect } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const schema = {
  type: 'object',
  properties: {
    time: {
      'type': 'string',
      'title': 'Time',
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



