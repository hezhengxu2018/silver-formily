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
      'title': '关键词',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    status: {
      'type': 'string',
      'title': '状态',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'enum': [
        { label: '启用', value: 'enabled' },
        { label: '停用', value: 'disabled' },
      ],
    },
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
      'enum': [
        { label: 'A 类', value: 'A' },
        { label: 'B 类', value: 'B' },
      ],
    },
    department: {
      'type': 'string',
      'title': '部门',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    priority: {
      'type': 'string',
      'title': '优先级',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'enum': [
        { label: '高', value: 'high' },
        { label: '中', value: 'medium' },
        { label: '低', value: 'low' },
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
    updatedAt: {
      'type': 'string',
      'title': '更新时间',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'daterange',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
      },
    },
    source: {
      'type': 'string',
      'title': '来源',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'enum': [
        { label: 'Web', value: 'web' },
        { label: 'App', value: 'app' },
      ],
    },
    region: {
      'type': 'string',
      'title': '地区',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    tag: {
      'type': 'string',
      'title': '标签',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
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
      // shadowRow 从 1 开始计数，<= 2 表示保留前两行
      return (context.node.shadowRow ?? 0) <= 2
    }"
    @auto-submit="handleAutoSubmit"
  />
</template>
