<script lang="ts" setup>
import { createForm } from '@formily/core'
import { SelectTable, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()

async function log(value) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="selectTable"
      :component="[
        SelectTable,
        {
          mode: 'single',
          rowKey: 'key',
          columns: [
            { prop: 'name', label: '标题' },
            { prop: 'description', label: '描述' },
          ],
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
    />

    <Submit style="margin-top: 30px;" @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
