<script setup lang="ts">
import { createForm } from '@formily/core'
import { createSchemaField, FormConsumer, FormProvider } from '@silver-formily/vue'
import { ArrayItems, InputBox } from './shared'

const { SchemaField } = createSchemaField({
  components: {
    ArrayItems,
    InputBox,
  },
})

const schema = { // [!code focus:39]
  type: 'object',
  properties: {
    rows: {
      'type': 'array',
      'title': 'rows',
      'x-component': 'ArrayItems',
      'items': {
        type: 'object',
        properties: {
          source: {
            'type': 'string',
            'title': 'source',
            'x-component': 'InputBox',
            'x-component-props': {
              placeholder: '行内 source，输入 123 控制同一行 target',
            },
          },
          target: {
            'type': 'string',
            'title': 'target',
            'x-component': 'InputBox',
            'x-component-props': {
              placeholder: '只受同一行 source 影响（依赖 .source）',
            },
            'x-reactions': {
              dependencies: ['.source'],
              fulfill: {
                schema: {
                  'x-visible': '{{$deps[0] === "123"}}',
                },
              },
            },
          },
        },
      },
    },
  },
}

const form = createForm({
  values: {
    rows: [{}],
  },
})
</script>

<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
    <FormConsumer>
      <template #default="{ form: currentForm }">
        <pre style="margin-top: 10px; white-space: pre-wrap;">{{ JSON.stringify(currentForm.values, null, 2) }}</pre>
      </template>
    </FormConsumer>
  </FormProvider>
</template>
