<script lang="ts" setup>
import { createForm } from '@formily/core'
import {
  ArrayTabs,
  DatePicker,
  FormItem,
  Input,
  Submit,
} from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Input,
    DatePicker,
    ArrayTabs,
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
      'title': '字符串数组',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayTabs',
      'items': [
        {
          'type': 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '输入字符串',
          },
        },
        {
          'type': 'string',
          'x-decorator': 'FormItem',
          'x-component': 'DatePicker',
          'x-component-props': {
            placeholder: '选择日期',
          },
        },
      ],
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
