<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, Select, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'
import { ElCheckbox } from 'element-plus'

const form = createForm()

async function log(value) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="select"
      title="选择框"
      :decorator="[FormItem]"
      :component="[
        Select,
        {
          style: {
            width: '240px',
          },
          multiple: true,
        },
      ]"
      :data-source="[
        {
          value: 'Beijing',
          label: 'Beijing',
        },
        {
          value: 'Shanghai',
          label: 'Shanghai',
        },
        {
          value: 'Nanjing',
          label: 'Nanjing',
        },
        {
          value: 'Chengdu',
          label: 'Chengdu',
        },
        {
          value: 'Shenzhen',
          label: 'Shenzhen',
        },
        {
          value: 'Guangzhou',
          label: 'Guangzhou',
        },
      ]"
    >
      <template #header="{ field }">
        <ElCheckbox
          :indeterminate="field.value?.length > 0 && field.value?.length < field?.dataSource?.length"
          @change="(value) => value ? field?.setValue(field?.dataSource?.map((item) => item.value)) : field?.setValue([])"
        >
          All
        </ElCheckbox>
      </template>
      <template #footer="{ field }">
        Selected City: {{ field.value?.length ?? 0 }}
      </template>
    </Field>
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
