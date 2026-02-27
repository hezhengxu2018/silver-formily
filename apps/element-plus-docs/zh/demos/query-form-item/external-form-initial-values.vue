<script setup lang="ts">
import type { ISchema } from '@formily/json-schema'
import { createForm } from '@formily/core'
import { QueryFormItem, SelectTable } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { ElButton, ElMessage } from 'element-plus'
import { createUserRequest } from './mock-user-request'

const form = createForm()
const request = createUserRequest()

// External query form instance with initial query params.
const queryForm = createForm({
  initialValues: {
    keyword: 'User-1',
    department: 'R&D',
  },
})

const querySchema: ISchema = {
  type: 'object',
  properties: {
    keyword: {
      'type': 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        clearable: true,
        placeholder: 'Keyword',
      },
    },
    department: {
      'type': 'string',
      'enum': [
        { label: 'All', value: '' },
        { label: 'R&D', value: 'R&D' },
        { label: 'Product', value: 'Product' },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        clearable: true,
        placeholder: 'Department',
        style: 'width: 120px;',
      },
    },
  },
}

async function handleSubmit() {
  const values = await form.submit()
  ElMessage.success(`Submit: ${JSON.stringify(values)}`)
}

const schema: ISchema = {
  type: 'object',
  properties: {
    selectedUsers: {
      'type': 'array',
      'x-decorator': 'QueryFormItem',
      'x-decorator-props': {
        mode: 'light',
        label: '',
        extra: 'Light mode query area uses an external form with initial values.',
        request,
        querySchema,
        queryFormProps: {
          form: () => queryForm, // [!code highlight]
          throttleWait: 200,
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
