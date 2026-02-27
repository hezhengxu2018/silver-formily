<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, InputTag, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()

async function log(value: any) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="topics"
      title="讨论话题"
      :decorator="[FormItem]"
      :component="[InputTag, { placeholder: '自定义样式', clearable: true, collapseTagsTooltip: true }]"
      :initial-value="['Formily', 'Element Plus']"
    >
      <template #prefix>
        <span class="demo-input-tag-prefix">话题</span>
      </template>
      <template #suffix>
        <span class="demo-input-tag-suffix">按 Enter 提交</span>
      </template>
      <template #tag="{ value, index, field }">
        <span class="demo-input-tag-chip">
          {{ index + 1 }}. {{ value }}
          <small v-if="field?.title">({{ field?.title }})</small>
        </span>
      </template>
    </Field>
    <Submit style="margin-top: 16px" @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>

<style scoped>
.demo-input-tag-prefix {
  display: inline-flex;
  align-items: center;
  padding: 0 8px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.demo-input-tag-suffix {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.demo-input-tag-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 999px;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}
</style>
