<script setup lang="ts">
import type { ISchema } from '@silver-formily/json-schema'
import { createForm } from '@silver-formily/core'
import { QueryForm } from '@silver-formily/element-plus'
import { ElMessage } from 'element-plus'

const form = createForm({
  initialValues: {
    keyword: 'Orders',
    status: 'enabled',
    creator: 'Tony',
  },
})

const schema: ISchema = {
  type: 'object',
  properties: {
    keyword: {
      'type': 'string',
      'title': 'Keyword',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: 'Enter a keyword',
      },
    },
    status: {
      'type': 'string',
      'title': 'Status',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: 'Please select',
      },
      'enum': [
        { label: 'Enabled', value: 'enabled' },
        { label: 'Disabled', value: 'disabled' },
      ],
    },
    creator: {
      'type': 'string',
      'title': 'Created By',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: 'Enter the creator',
      },
    },
  },
}

async function handleAutoSubmit(values: any) {
  ElMessage.success(`Submitted data: ${JSON.stringify(values)}`)
}
</script>

<template>
  <QueryForm
    :form="form"
    :schema="schema"
    :show-toggle="false"
    reset-text="Restore Initial Values"
    @auto-submit="handleAutoSubmit"
  />
</template>



