<script setup lang="ts">
import type { ISchema } from '@formily/json-schema'
import { createForm } from '@formily/core'
import { QueryForm } from '@silver-formily/element-plus'

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
    department: {
      'type': 'string',
      'title': 'Department',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    priority: {
      'type': 'string',
      'title': 'Priority',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'enum': [
        { label: 'High', value: 'high' },
        { label: 'Medium', value: 'medium' },
        { label: 'Low', value: 'low' },
      ],
    },
    source: {
      'type': 'string',
      'title': 'Source',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'enum': [
        { label: 'Web', value: 'web' },
        { label: 'App', value: 'app' },
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
    updatedAt: {
      'type': 'string',
      'title': 'Updated At',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'daterange',
      },
    },
  },
}
</script>

<template>
  <QueryForm
    :form="form"
    :schema="schema"
    layout="vertical"
    :grid-props="{ breakpoints: [900, Infinity], minColumns: [3, 4], maxColumns: [3, 4] }"
  />
</template>
