<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, Rate, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const schema = {
  type: 'object',
  properties: {
    rate: {
      'type': 'number',
      'title': '评分',
      'x-decorator': 'FormItem',
      'x-component': 'Rate',
    },
    rateHalf: {
      'type': 'number',
      'title': '半星评分',
      'x-decorator': 'FormItem',
      'x-component': 'Rate',
      'x-component-props': {
        allowHalf: true,
      },
    },
    rateText: {
      'type': 'number',
      'title': '显示文字',
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
