<script setup lang="ts">
import type { ISchema } from '@silver-formily/json-schema'
import { createForm } from '@silver-formily/core'
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
      'title': 'Keyword',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        clearable: true,
        placeholder: 'Filter by permission name',
      },
    },
    module: {
      'type': 'string',
      'title': 'Module',
      'enum': [
        { label: 'All', value: '' },
        { label: 'Users', value: 'user' },
        { label: 'Orders', value: 'order' },
        { label: 'Finance', value: 'finance' },
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
    ElMessage.error('Please select at least one permission first')
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
          message: 'Please select at least one permission',
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
        extra: 'Changing the filter criteria and clicking Search will automatically clear the selected data.',
      },
      'x-component': 'Transfer',
      'x-component-props': {
        titles: ['Available Permissions', 'Selected Permissions'],
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



