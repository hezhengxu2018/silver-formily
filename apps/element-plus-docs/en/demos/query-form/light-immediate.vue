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
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: 'Keyword',
      },
    },
    status: {
      'type': 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: 'Status',
        style: {
          width: '80px',
        },
      },
      'enum': [
        { label: 'Enabled', value: 'enabled' },
        { label: 'Disabled', value: 'disabled' },
      ],
    },
  },
}

async function handleAutoSubmit(values: any) {
  ElMessage.info(`Real-time submit: ${JSON.stringify(values)}`)
}
</script>

<template>
  <QueryForm.Light
    :form="form"
    :schema="schema"
    :throttle-wait="0"
    @auto-submit="handleAutoSubmit"
  />
</template>



