<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, Slider, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const schema = {
  type: 'object',
  properties: {
    slider: {
      'type': 'number',
      'title': '滑块',
      'x-decorator': 'FormItem',
      'x-component': 'Slider',
      'x-component-props': {
        style: {
          width: '240px',
        },
        showInput: true,
      },
      'default': 30,
    },
    sliderRange: {
      'type': 'array',
      'title': '区间与刻度',
      'x-decorator': 'FormItem',
      'x-component': 'Slider',
      'x-component-props': {
        style: {
          width: '240px',
        },
        range: true,
        marks: {
          0: '0',
          20: '20',
          40: '40',
          60: '60',
          80: '80',
          100: '100',
        },
      },
      'default': [20, 60],
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Slider,
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
