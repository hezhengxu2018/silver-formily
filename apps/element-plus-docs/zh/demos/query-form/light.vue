<script setup lang="ts">
import type { ISchema } from '@formily/json-schema'
import { createForm } from '@formily/core'
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
        { label: '按天', value: 'day' },
        { label: '按周', value: 'week' },
      ],
    },
    operationAt: {
      'type': 'string',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'daterange',
        startPlaceholder: '操作开始时间',
        endPlaceholder: '操作结束时间',
      },
    },
  },
}

async function handleAutoSubmit(values: any) {
  ElMessage.success(`自动查询: ${JSON.stringify(values)}`)
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
