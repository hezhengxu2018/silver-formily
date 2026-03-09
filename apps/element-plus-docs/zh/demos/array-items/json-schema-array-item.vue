<script lang="ts" setup>
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import {
  ArrayItems,
  DatePicker,
  Editable,
  FormItem,
  Input,
  Select,
  Space,
  Submit,
} from '@sliver/formily-element-plus'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Space,
    Editable,
    Input,
    Select,
    DatePicker,
    ArrayItems,
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
      'x-component': 'ArrayItems',
      'x-decorator': 'FormItem',
      'title': '字符串数组',
      'items': [
        {
          'type': 'void',
          'x-component': 'Space',
          'properties': {
            sort: {
              'type': 'void',
              'x-decorator': 'FormItem',
              'x-component': 'ArrayItems.SortHandle',
            },
            input: {
              'type': 'string',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },
            remove: {
              'type': 'void',
              'x-decorator': 'FormItem',
              'x-component': 'ArrayItems.Remove',
            },
          },
        },
        {
          'type': 'void',
          'x-component': 'Space',
          'properties': {
            sort: {
              'type': 'void',
              'x-decorator': 'FormItem',
              'x-component': 'ArrayItems.SortHandle',
            },
            input: {
              'type': 'string',
              'x-decorator': 'FormItem',
              'x-component': 'DatePicker',
            },
            remove: {
              'type': 'void',
              'x-decorator': 'FormItem',
              'x-component': 'ArrayItems.Remove',
            },
          },
        },
      ],
      'properties': {
        add: {
          'type': 'void',
          'title': '添加条目',
          'x-component': 'ArrayItems.Addition',
        },
      },
    },
  },
}

async function log(values: Record<string, any>) {
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
