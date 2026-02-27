<script lang="ts" setup>
import { createForm } from '@formily/core'
import { SelectTable, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()

async function log(value) {
  console.log(value)
}

function selectable(row: Record<string, any>, index: number, field) {
  if (field.value === undefined) {
    return true
  }
  return field.value?.length < 2 || row.key === field.value?.find(item => item.key === row.key)?.key
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="selectTable"
      :component="[
        SelectTable,
        {
          rowKey: 'key',
          optionAsValue: true,
          selectable,
        },
      ]"
      :data-source="[
        {
          key: '1',
          name: 'title-1',
          description: 'description-1',
        },
        {
          key: '2',
          name: 'title-2',
          description: 'description-2',
        },
        {
          key: '3',
          name: 'title-3',
          description: 'description-3',
        },
      ]"
    >
      <ElTableColumn prop="name" label="标题" />
    </Field>

    <Submit style="margin-top: 30px;" @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
