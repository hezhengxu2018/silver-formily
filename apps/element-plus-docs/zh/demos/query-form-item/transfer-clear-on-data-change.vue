<script setup lang="ts">
import type { ISchema } from '@formily/json-schema'
import { createForm } from '@formily/core'
import { QueryFormItem, Transfer } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { ElButton, ElMessage } from 'element-plus'
import { createPermissionRequest } from './mock-user-request'

const form = createForm()
const request = createPermissionRequest()

const querySchema: ISchema = {
  type: 'object',
  properties: {
    keyword: {
      'type': 'string',
      'title': '关键词',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        clearable: true,
        placeholder: '按权限名称过滤',
      },
    },
    module: {
      'type': 'string',
      'title': '模块',
      'enum': [
        { label: '全部', value: '' },
        { label: '用户', value: 'user' },
        { label: '订单', value: 'order' },
        { label: '财务', value: 'finance' },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        clearable: true,
        style: 'width: 130px;',
      },
    },
  },
}

async function handleSubmit() {
  try {
    const values = await form.submit()
    ElMessage.success(`Submit: ${JSON.stringify(values)}`)
  }
  catch {
    ElMessage.error('请先选择至少一项权限')
  }
}

const schema: ISchema = {
  type: 'object',
  properties: {
    selectedPermissions: {
      'type': 'array',
      'x-validator': [
        {
          required: true,
          message: '请选择至少一项权限',
        },
      ],
      'x-decorator': 'QueryFormItem',
      'x-decorator-props': {
        label: '',
        required: true,
        querySchema,
        request,
        pagination: false,
        clearOnDataChange: true,
        extra: '修改过滤条件并点击查询后，会自动清空已选择的数据。',
      },
      'x-component': 'Transfer',
      'x-component-props': {
        titles: ['可选权限', '已选权限'],
        filterable: true,
      },
    },
  },
}

const { SchemaField } = createSchemaField({
  components: {
    QueryFormItem,
    Transfer,
  },
})
</script>

<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
    <ElButton type="primary" style="margin-top: 12px;" @click="handleSubmit">
      Submit
    </ElButton>
  </FormProvider>
</template>
