<script setup lang="ts">
import type { ISchema } from '@formily/json-schema'
import { createForm } from '@formily/core'
import { QueryFormItem, SelectTable } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { ElButton, ElMessage } from 'element-plus'
import { createUserRequest } from './mock-user-request'

const form = createForm()
const request = createUserRequest()

const querySchema: ISchema = {
  type: 'object',
  properties: {
    keyword: {
      'type': 'string',
      'title': 'Keyword',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        clearable: true,
        placeholder: 'Search by name',
      },
    },
    department: {
      'type': 'string',
      'title': 'Department',
      'enum': [
        { label: 'All', value: '' },
        { label: 'R&D', value: 'R&D' },
        { label: 'Product', value: 'Product' },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        clearable: true,
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
        tooltip: 'Select at least one user from the table',
        extra: 'Use the query area to filter the table before selecting.',
        querySchema,
        request,
        paginationProps: {
          pageSize: 8,
        },
        queryFormProps: {
          submitText: 'Search',
          resetText: 'Reset',
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
