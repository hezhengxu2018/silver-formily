<script setup lang="ts">
import type { ISchema } from '@formily/json-schema'
import { createForm } from '@formily/core'
import { QueryForm } from '@silver-formily/element-plus'
import { ElMessage } from 'element-plus'

const form = createForm({
  initialValues: {
    keyword: '订单',
    status: 'enabled',
    creator: 'Tony',
  },
})

const schema: ISchema = {
  type: 'object',
  properties: {
    keyword: {
      'type': 'string',
      'title': '关键词',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入关键词',
      },
    },
    status: {
      'type': 'string',
      'title': '状态',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: '请选择',
      },
      'enum': [
        { label: '启用', value: 'enabled' },
        { label: '停用', value: 'disabled' },
      ],
    },
    creator: {
      'type': 'string',
      'title': '创建人',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入创建人',
      },
    },
  },
}

async function handleAutoSubmit(values: any) {
  ElMessage.success(`提交数据: ${JSON.stringify(values)}`)
}
</script>

<template>
  <QueryForm
    :form="form"
    :schema="schema"
    :show-toggle="false"
    reset-text="恢复初始值"
    @auto-submit="handleAutoSubmit"
  />
</template>
