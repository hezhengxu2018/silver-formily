<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, Mention, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()

const mentionOptions = [
  { value: 'UI指南', label: 'UI 指南更新', owner: 'Jasmine' },
  { value: '性能调研', label: '性能调研', owner: 'Kingsley', disabled: true },
  { value: '发布 checklist', label: '发布 checklist', owner: 'Mia' },
]

async function log(value: any) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="post"
      title="更新内容"
      :decorator="[FormItem]"
      :component="[Mention, { rows: 3, placeholder: '在此输入 @ 信息并自定义下拉内容', options: mentionOptions }]"
      initial-value="@UI指南 已补充视觉规范，@发布 checklist 请补全 QA 入口。"
    >
      <template #prefix>
        <span class="mention-prefix">更新</span>
      </template>
      <template #suffix>
        <span class="mention-suffix">⌘ + Enter 发布</span>
      </template>
      <template #header="{ field }">
        <div class="mention-panel-header">
          当前字段：{{ field?.title }}
        </div>
      </template>
      <template #label="{ item, index, field }">
        <div class="mention-option">
          <span class="mention-option__index">{{ index + 1 }}</span>
          <div class="mention-option__body">
            <strong>{{ item.label }}</strong>
            <small>Owner: {{ item.owner }}</small>
            <small v-if="field?.value">源字段值：{{ field?.value.length }}</small>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="mention-panel-footer">
          可以通过 slots 访问 field，并渲染富文本内容
        </div>
      </template>
    </Field>
    <Submit style="margin-top: 12px" @submit="log">
      保存
    </Submit>
  </FormProvider>
</template>

<style scoped>
.mention-prefix {
  display: inline-flex;
  align-items: center;
  padding: 0 8px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.mention-suffix {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.mention-panel-header,
.mention-panel-footer {
  font-size: 12px;
  padding: 4px 8px;
  color: var(--vp-c-text-2);
}

.mention-option {
  display: flex;
  gap: 8px;
  align-items: center;
}

.mention-option__index {
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background-color: var(--vp-c-bg-soft);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.mention-option__body {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.mention-option__body strong {
  color: var(--vp-c-text-1);
}

.mention-option__body small {
  font-size: 11px;
}
</style>
