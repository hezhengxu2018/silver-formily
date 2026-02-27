<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, Radio, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()

async function log(value) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="radio"
      title="单选"
      :decorator="[FormItem]"
      :component="[Radio.Group]"
      :data-source="[
        {
          label: '选项1',
          value: 1,
        },
        {
          label: '选项2',
          value: 2,
        },
      ]"
    />
    <Field
      name="radio-slot"
      title="单选插槽"
      :component="[Radio.Group]"
      :decorator="[FormItem]"
      :data-source="[
        { label: '标签1', value: '1' },
        { label: '标签2', value: '2' },
      ]"
    >
      <template #option="{ option }">
        使用插槽渲染的{{ option.label }}
      </template>
    </Field>
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
