<script lang="ts" setup>
import { createForm } from '@formily/core'
import {
  ArrayTabs,
  FormItem,
  Input,
  Submit,
} from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayTabs,
  },
})

const form = createForm()
const schema = {
  type: 'object',
  properties: {
    string_array: {
      'type': 'array',
      'title': '字符串数组',
      'x-decorator': 'FormItem',
      'maxItems': 3,
      'x-component': 'ArrayTabs',
      'items': {
        'type': 'string',
        'x-decorator': 'FormItem',
        'required': true,
        'x-component': 'Input',
      },
    },
    array: {
      'type': 'array',
      'title': '对象数组',
      'x-decorator': 'FormItem',
      'maxItems': 3,
      'x-component': 'ArrayTabs',
      'items': {
        type: 'object',
        properties: {
          aaa: {
            'type': 'string',
            'x-decorator': 'FormItem',
            'title': 'AAA',
            'required': true,
            'x-component': 'Input',
          },
          bbb: {
            'type': 'string',
            'x-decorator': 'FormItem',
            'title': 'BBB',
            'required': true,
            'x-component': 'Input',
          },
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
