<script setup lang="ts">
import type { ISchema } from '@silver-formily/json-schema'
import { createForm } from '@silver-formily/core'
import { QueryForm, Segmented } from '@silver-formily/element-plus'
import { ElMessage } from 'element-plus'

const form = createForm()

const schema: ISchema = {
  type: 'object',
  properties: {
    granularity: {
      'type': 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Segmented',
      'enum': [
        { label: 'By Day', value: 'day' },
        { label: 'By Week', value: 'week' },
      ],
    },
    operationAt: {
      'type': 'string',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'daterange',
        startPlaceholder: 'Operation Start Time',
        endPlaceholder: 'Operation End Time',
      },
    },
  },
}

async function handleAutoSubmit(values: any) {
  ElMessage.success(`Auto query: ${JSON.stringify(values)}`)
}
</script>

<template>
  <QueryForm.Light
    :form="form"
    :schema="schema"
    :throttle-wait="500"
    :components="{ Segmented }"
    @auto-submit="handleAutoSubmit"
  />
</template>



