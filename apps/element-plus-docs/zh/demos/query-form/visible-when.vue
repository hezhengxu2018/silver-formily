<script setup lang="ts">
import type { ISchema } from '@formily/json-schema'
import { createForm } from '@formily/core'
import { QueryForm } from '@silver-formily/element-plus'
import { ElMessage } from 'element-plus'

const form = createForm()

const schema: ISchema = {
  type: 'object',
  properties: {
    owner: {
      'type': 'string',
      'title': '负责人',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    category: {
      'type': 'string',
      'title': '分类',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: '请选择',
      },
      'enum': [
        { label: 'A 类', value: 'A' },
        { label: 'B 类', value: 'B' },
      ],
    },
    keyword: {
      'type': 'string',
      'title': '关键词',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
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
    createdAt: {
      'type': 'string',
      'title': '创建时间',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'daterange',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
      },
    },
    remark: {
      'type': 'string',
      'title': '备注',
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
    :grid-props="{ breakpoints: [900, Infinity], maxColumns: [3, 4], maxWidth: 240 }"
    :visible-when="(context) => {
      if (!context.collapsed)
        return true
      const name = context.field?.address?.toString() ?? ''
      const primary = ['keyword', 'status']
      if (primary.includes(name))
        return true
      return false
    }"
    @auto-submit="handleAutoSubmit"
  />
</template>
