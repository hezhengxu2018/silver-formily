<script setup lang="ts">
/* eslint-disable no-template-curly-in-string */
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider, RecordsScope } from '@silver-formily/vue'
import { ElInput } from 'element-plus'
import { defineComponent, h } from 'vue'

const form = createForm()

// 自定义列表扩展组件内部用 RecordsScope 传递记录作用域变量
const MyCustomComponent = defineComponent({
  name: 'MyCustomComponent',
  props: {
    records: Array,
  },
  setup(props, { slots }) {
    return () =>
      h(RecordsScope, {
        getRecords: () => props.records,
      }, slots)
  },
})

const { SchemaField } = createSchemaField({
  components: {
    ElInput,
    MyCustomComponent,
  },
})

const schema = {
  type: 'object',
  properties: {
    records: {
      'type': 'void',
      'x-component': 'MyCustomComponent',
      'x-component-props': {
        records: [
          {
            name: 'Name',
            code: 'Code',
          },
        ],
      },
      'properties': {
        input: {
          'type': 'string',
          'x-component': 'ElInput',
          'x-value':
            '{{`'
            + '${$records[0].name} '
            + '${$records[0].code} '
            + '`}}',
        },
      },
    },
  },
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
  </FormProvider>
</template>
