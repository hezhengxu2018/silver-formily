<script setup lang="ts">
import type { QueryFormItemSelectedListItem } from '@silver-formily/element-plus'
import type { ISchema } from '@silver-formily/json-schema'
import { createForm } from '@silver-formily/core'
import { QueryFormItem, QueryFormItemSelectedList, SelectTable } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'
import { defineComponent, h } from 'vue'
import { createUserRequest } from './mock-user-request'

const form = createForm()
const request = createUserRequest()

function getSelectedUserText(item: QueryFormItemSelectedListItem) {
  return item.record?.name ?? String(item.value)
}

const SelectedListExtra = defineComponent({
  name: 'SelectedListExtra',
  setup() {
    return () => h(QueryFormItemSelectedList, {
      itemText: getSelectedUserText,
    })
  },
})

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
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="selectedUsers"
      :decorator="[
        QueryFormItem,
        {
          label: 'Target Users',
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
      ]"
      :decorator-content="{
        extra: SelectedListExtra,
      }"
      :component="[
        SelectTable,
        {
          mode: 'multiple',
          rowKey: 'id',
          optionAsValue: true,
          showAlertToolbar: false,
          columns: [
            { prop: 'name', label: 'Name' },
            { prop: 'department', label: 'Department' },
          ],
        },
      ]"
    />
  </FormProvider>
</template>
