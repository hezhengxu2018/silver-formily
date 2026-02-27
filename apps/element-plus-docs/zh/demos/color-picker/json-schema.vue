<script lang="ts" setup>
import { createForm } from '@formily/core'
import { ColorPicker, FormItem, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const predefineColors = [
  '#409EFF',
  '#67C23A',
  '#E6A23C',
  '#F56C6C',
  '#909399',
]

const schema = {
  type: 'object',
  properties: {
    color: {
      'type': 'string',
      'title': '基础用法',
      'x-decorator': 'FormItem',
      'x-component': 'ColorPicker',
      'default': '#409EFF',
    },
    colorAlpha: {
      'type': 'string',
      'title': '透明度',
      'x-decorator': 'FormItem',
      'x-component': 'ColorPicker',
      'x-component-props': {
        showAlpha: true,
      },
      'default': 'rgba(255, 69, 0, 0.68)',
    },
    colorPredefine: {
      'type': 'string',
      'title': '预设色值',
      'x-decorator': 'FormItem',
      'x-component': 'ColorPicker',
      'x-component-props': {
        predefine: predefineColors,
      },
      'default': '#E02020',
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    ColorPicker,
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
