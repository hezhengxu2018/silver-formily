<script setup lang="ts">
import type { ISchema } from '@formily/json-schema'
import { createForm } from '@formily/core'
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
        placeholder: '关键词',
      },
    },
    status: {
      'type': 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: '状态',
        style: {
          width: '80px',
        },
      },
      'enum': [
        { label: '启用', value: 'enabled' },
        { label: '停用', value: 'disabled' },
      ],
    },
  },
}

async function handleAutoSubmit(values: any) {
  ElMessage.info(`实时提交: ${JSON.stringify(values)}`)
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
