<script lang="ts" setup>
import { createForm } from '@formily/core'
import { ArrayCards, DatePicker, FormItem, Input, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Input,
    DatePicker,
    ArrayCards,
  },
})

const form = createForm({
  initialValues: {
    string_array: ['', ''],
  },
})

const schema = {
  type: 'object',
  properties: {
    string_array: {
      'type': 'array',
      'x-component': 'ArrayCards',
      'x-decorator': 'FormItem',
      'x-component-props': {
        title: '字符串数组',
      },
      'items': [
        {
          type: 'void',
          title: '11111',
          properties: {
            index: {
              'type': 'void',
              'x-component': 'ArrayCards.Index',
            },
            input: {
              'type': 'string',
              'x-decorator': 'FormItem',
              'title': 'Input',
              'x-component': 'Input',
              'x-component-props': {
                placeholder: '输入字符串',
              },
            },
            remove: {
              'type': 'void',
              'x-component': 'ArrayCards.Remove',
            },
            moveUp: {
              'type': 'void',
              'x-component': 'ArrayCards.MoveUp',
            },
            moveDown: {
              'type': 'void',
              'x-component': 'ArrayCards.MoveDown',
            },
          },
        },
        {
          type: 'void',
          title: '22222',
          properties: {
            index: {
              'type': 'void',
              'x-component': 'ArrayCards.Index',
            },
            input: {
              'type': 'string',
              'x-decorator': 'FormItem',
              'title': 'DatePicker',
              'x-component': 'DatePicker',
              'x-component-props': {
                placeholder: '选择日期',
              },
            },
            remove: {
              'type': 'void',
              'x-component': 'ArrayCards.Remove',
            },
          },
        },
      ],
      'properties': {
        addition: {
          'type': 'void',
          'title': '添加条目',
          'x-component': 'ArrayCards.Addition',
        },
      },
    },
  },
}

async function log(values) {
  console.log(values)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>

<style lang="scss" scoped></style>
