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
      'title': '关键词',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        clearable: true,
        placeholder: '按名称搜索',
      },
    },
    department: {
      'type': 'string',
      'title': '部门',
      'enum': [
        { label: '全部', value: '' },
        { label: '研发', value: 'R&D' },
        { label: '产品', value: 'Product' },
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
          label: '目标用户',
          querySchema,
          request,
          paginationProps: {
            pageSize: 8,
          },
          queryFormProps: {
            submitText: '查询',
            resetText: '重置',
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
            { prop: 'name', label: '名称' },
            { prop: 'department', label: '部门' },
          ],
        },
      ]"
    />
  </FormProvider>
</template>
