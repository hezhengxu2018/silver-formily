<script setup lang="ts">
import type { ISchema } from '@formily/json-schema'
import { createForm } from '@formily/core'
import { QueryForm } from '@silver-formily/element-plus'
import { ElMessage } from 'element-plus'

const form = createForm()
const schema: ISchema = {
  type: 'object',
  properties: {
    input1: {
      'type': 'string',
      'title': 'Input 1',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    input2: {
      'type': 'string',
      'title': 'Input 2',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
}

async function handleAutoSubmit(values: any) {
  ElMessage.success(`自动提交: ${JSON.stringify(values)}`)
}
</script>

<template>
  <QueryForm
    :form="form"
    :schema="schema"
    :grid-props="{ breakpoints: [900, Infinity], maxColumns: [3, 4] }"
    @auto-submit="handleAutoSubmit"
  />
</template>
