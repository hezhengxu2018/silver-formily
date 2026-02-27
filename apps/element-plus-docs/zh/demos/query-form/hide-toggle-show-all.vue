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
    category: {
      'type': 'string',
      'title': 'Category',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'enum': [
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
      ],
    },
    region: {
      'type': 'string',
      'title': 'Region',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    tag: {
      'type': 'string',
      'title': 'Tag',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
}
</script>

<template>
  <QueryForm
    :form="form"
    :schema="schema"
    :default-expanded="true"
    :show-toggle="false"
    :grid-props="{ breakpoints: [900, Infinity], maxColumns: [3, 4], maxWidth: 220 }"
  />
</template>
