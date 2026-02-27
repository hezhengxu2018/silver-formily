<script lang="ts" setup>
import { createForm } from '@formily/core'
import { Autocomplete, FormItem, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()

const libraryOptions = [
  { value: 'Vue.js', description: '轻量且易上手的 MVVM 框架' },
  { value: 'React', description: '由 Meta 推出的声明式 UI 库' },
  { value: 'Svelte', description: '编译时框架，运行时代码体积小' },
  { value: 'SolidJS', description: '细粒度响应式系统' },
  { value: 'Angular', description: '完善的一体化框架' },
]

async function log(value: any) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="library"
      title="框架选择"
      :decorator="[FormItem]"
      :component="[
        Autocomplete,
        {
          triggerOnFocus: true,
          placeholder: '请选择你喜欢的框架',
          style: { width: '320px' },
        },
      ]"
      :data-source="libraryOptions"
    >
      <template #default="{ item, field }">
        <div class="demo-autocomplete-item">
          <div class="demo-autocomplete-item__meta">
            <strong>{{ item.value }}</strong>
            <span>{{ item.description }}</span>
          </div>
          <span class="demo-autocomplete-item__hint">
            当前值：{{ field?.value?.value ?? '未选择' }}
          </span>
        </div>
      </template>
    </Field>
    <Submit style="margin-top: 12px" @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>

<style scoped>
.demo-autocomplete-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
}

.demo-autocomplete-item__meta {
  display: flex;
  flex-direction: column;
}

.demo-autocomplete-item__meta strong {
  font-weight: 600;
}

.demo-autocomplete-item__meta span {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.demo-autocomplete-item__hint {
  font-size: 12px;
  color: var(--vp-c-text-3);
}
</style>
