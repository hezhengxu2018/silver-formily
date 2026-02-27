<script setup lang="ts">
import type { ISchema } from '@formily/json-schema'
import { createForm } from '@formily/core'
import { QueryFormItem, Segmented, SelectTable } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { ElButton, ElMessage } from 'element-plus'
import { createUserRequest } from './mock-user-request'

const form = createForm()
const request = createUserRequest()

const querySchema: ISchema = {
  type: 'object',
  properties: {
    department: {
      'type': 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Segmented',
      'enum': [
        { label: 'All', value: '' },
        { label: 'R&D', value: 'R&D' },
        { label: 'Product', value: 'Product' },
      ],
      'default': '',
    },
  },
}

async function handleSubmit() {
  try {
    const values = await form.submit()
    ElMessage.success(`Submit: ${JSON.stringify(values)}`)
  }
  catch {
    ElMessage.error('Please select at least one user before submit')
  }
}

const schema: ISchema = {
  type: 'object',
  properties: {
    selectedUsers: {
      'type': 'array',
      'x-validator': [
        {
          required: true,
          message: 'Please select at least one user',
        },
      ],
      'x-decorator': 'QueryFormItem',
      'x-decorator-props': {
        label: 'Target Users',
        required: true,
        extra: '通过 queryFormProps.components 注册 Segmented 后，可在 querySchema 中直接使用。',
        querySchema,
        request,
        mode: 'light',
        paginationProps: {
          pageSize: 8,
        },
        queryFormProps: {
          throttleWait: 200,
          components: {
            Segmented,
          },
        },
      },
      'x-component': 'SelectTable',
      'x-component-props': {
        mode: 'multiple',
        rowKey: 'id',
        columns: [
          { prop: 'name', label: 'Name' },
          { prop: 'department', label: 'Department' },
        ],
      },
    },
  },
}

const { SchemaField } = createSchemaField({
  components: {
    QueryFormItem,
    SelectTable,
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
