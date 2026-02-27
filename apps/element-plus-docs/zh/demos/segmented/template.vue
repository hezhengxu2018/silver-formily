<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, Segmented, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()

async function log(value) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="segmented"
      title="分段选择"
      :decorator="[FormItem]"
      :component="[Segmented]"
      :data-source="[
        { label: '按天', value: 'day' },
        { label: '按周', value: 'week' },
        { label: '按月', value: 'month' },
      ]"
    />
    <Field
      name="segmented-slot"
      title="插槽渲染"
      :decorator="[FormItem]"
      :component="[Segmented]"
      :data-source="[
        { label: '立即', value: 'now' },
        { label: '今天', value: 'today' },
        { label: '本周', value: 'week' },
      ]"
    >
      <template #default="{ item }">
        自定义{{ typeof item === 'object' ? item.label : item }}
      </template>
    </Field>
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
