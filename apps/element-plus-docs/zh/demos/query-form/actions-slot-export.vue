<script setup lang="ts">
import type { ISchema } from '@formily/json-schema'
import { Download, RefreshRight, Search } from '@element-plus/icons-vue'
import { createForm } from '@formily/core'
import {
  QueryForm,
  Reset,
  Submit,
} from '@silver-formily/element-plus'
import { ElButton, ElMessage } from 'element-plus'

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
    operationAt: {
      'type': 'string',
      'title': '操作时间',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'daterange',
      },
    },
  },
}

function onExport() {
  ElMessage.success('导出中...')
}

async function handleAutoSubmit(values: any) {
  ElMessage.success(`自动提交: ${JSON.stringify(values)}`)
}
</script>

<template>
  <QueryForm
    :form="form"
    :schema="schema"
    :grid-props="{ breakpoints: [1075, 1410, Infinity], maxColumns: [2, 3, 4] }"
    @auto-submit="handleAutoSubmit"
  >
    <template #actions>
      <Submit :icon="Search">
        查询
      </Submit>
      <Reset :icon="RefreshRight">
        重置
      </Reset>
      <ElButton :icon="Download" @click="onExport">
        导出
      </ElButton>
    </template>
  </QueryForm>
</template>
