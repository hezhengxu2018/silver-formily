<script setup lang="ts">
/* eslint-disable no-template-curly-in-string */
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider, RecordScope } from '@silver-formily/vue'
import { ElInput } from 'element-plus'
import { defineComponent, h } from 'vue'

const form = createForm()

// 自定义列表扩展组件内部用 RecordScope 传递记录作用域变量
const MyCustomComponent = defineComponent({
  name: 'MyCustomComponent',
  props: {
    record: Object,
    index: Number,
  },
  setup(props, { slots }) {
    return () =>
      h(RecordScope, {
        getRecord: () => props.record,
        getIndex: () => props.index,
      }, slots)
  },
})

const { SchemaField } = createSchemaField({
  components: {
    ElInput,
    MyCustomComponent,
  },
})

// 嵌套两层 MyCustomComponent，演示 $record / $index / $lookup 层层向上的完整变量链
const schema = {
  type: 'object',
  properties: {
    lookup: {
      'type': 'void',
      'x-component': 'MyCustomComponent',
      'x-component-props': {
        record: {
          name: 'Lookup Name',
          code: 'Lookup Code',
        },
        index: 1,
      },
      'properties': {
        record: {
          'type': 'void',
          'x-component': 'MyCustomComponent',
          'x-component-props': {
            record: {
              name: 'Name',
              code: 'Code',
            },
            index: 0,
          },
          'properties': {
            input: {
              'type': 'string',
              'x-component': 'ElInput',
              'x-value':
                '{{`'
                + '${$record.name} '
                + '${$record.code} '
                + '${$record.$index} '
                + '${$record.$lookup.name} '
                + '${$record.$lookup.code} '
                + '${$index} '
                + '${$lookup.name} '
                + '${$lookup.code} '
                + '`}}',
            },
          },
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
