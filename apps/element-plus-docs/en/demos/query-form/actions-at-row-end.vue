<script setup lang="ts">
import type { ISchema } from '@silver-formily/json-schema'
import { createForm } from '@silver-formily/core'
import { QueryForm } from '@silver-formily/element-plus'
import { ElMessage } from 'element-plus'

const form = createForm()

const schema: ISchema = {
  type: 'object',
  properties: {
    keyword: {
      'type': 'string',
      'title': 'Keyword',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    status: {
      'type': 'string',
      'title': 'Status',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'enum': [
        { label: 'Enabled', value: 'enabled' },
        { label: 'Disabled', value: 'disabled' },
      ],
    },
    owner: {
      'type': 'string',
      'title': 'Owner',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    category: {
      'type': 'string',
      'title': 'Category',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'enum': [
        { label: 'Category A', value: 'A' },
        { label: 'Category B', value: 'B' },
      ],
    },
    createdAt: {
      'type': 'string',
      'title': 'Created At',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'daterange',
      },
    },
  },
}

async function handleAutoSubmit(values: any) {
  ElMessage.success(`Auto submit: ${JSON.stringify(values)}`)
}
</script>

<template>
  <QueryForm
    :form="form"
    :schema="schema"
    :grid-props="{ breakpoints: [900, Infinity], maxColumns: [3, 4], maxWidth: 220 }"
    actions-at-row-end
    @auto-submit="handleAutoSubmit"
  />
</template>



