<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, Rate, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const schema = {
  type: 'object',
  properties: {
    rate: {
      'type': 'number',
      'title': 'Rate',
      'x-decorator': 'FormItem',
      'x-component': 'Rate',
    },
    rateHalf: {
      'type': 'number',
      'title': 'Half-star Rating',
      'x-decorator': 'FormItem',
      'x-component': 'Rate',
      'x-component-props': {
        allowHalf: true,
      },
    },
    rateText: {
      'type': 'number',
      'title': 'Show Text',
      'x-decorator': 'FormItem',
      'x-component': 'Rate',
      'x-component-props': {
        showText: true,
      },
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Rate,
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



