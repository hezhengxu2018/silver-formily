<script lang="ts" setup>
import { createForm } from '@formily/core'
import { Autocomplete, FormItem, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'
import { ref } from 'vue'

const form = createForm()
const loading = ref(false)

const libraries = [
  { value: 'Vue.js', description: '轻量且渐进式的 MVVM 框架' },
  { value: 'React', description: '由 Meta 推出的声明式 UI 库' },
  { value: 'Svelte', description: '编译时框架，运行时代码体积更小' },
  { value: 'SolidJS', description: '细粒度响应式系统' },
  { value: 'Angular', description: '自带完整方案的一体化框架' },
]

function fetchLibraries(query: string, cb: (data: typeof libraries) => void) {
  loading.value = true
  const keyword = query?.toLowerCase() ?? ''
  setTimeout(() => {
    const results = keyword
      ? libraries.filter(item => item.value.toLowerCase().includes(keyword))
      : libraries
    cb(results)
    loading.value = false
  }, 500)
}

async function log(value: any) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="library"
      title="推荐框架"
      :decorator="[FormItem]"
      :component="[
        Autocomplete,
        {
          triggerOnFocus: true,
          fetchSuggestions: fetchLibraries,
          placeholder: '搜索或选择框架',
          style: { width: '320px' },
        },
      ]"
    >
      <template #prefix>
        <span class="demo-autocomplete-chip">框架</span>
      </template>
      <template #suffix>
        <span class="demo-autocomplete-shortcut">⌘ K</span>
      </template>
      <template #header="{ field }">
        <div class="demo-autocomplete-header">
          最近一次选择：{{ field?.value ?? '暂无' }}
        </div>
      </template>
      <template #default="{ item }">
        <div class="demo-autocomplete-item">
          <strong>{{ item.value }}</strong>
          <span>{{ item.description }}</span>
        </div>
      </template>
      <template #loading>
        <div class="demo-autocomplete-loading">
          正在加载候选...
        </div>
      </template>
      <template #footer>
        <div class="demo-autocomplete-footer">
          没有找到想要的框架？
          <a href="https://github.com/vuejs" target="_blank" rel="noreferrer">点此反馈</a>
        </div>
      </template>
    </Field>
    <Submit style="margin-top: 16px" @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>

<style scoped>
.demo-autocomplete-chip {
  display: inline-flex;
  align-items: center;
  padding: 0 6px;
  font-size: 12px;
  background-color: var(--vp-c-bg-soft);
  border-radius: 4px;
  color: var(--vp-c-text-1);
}

.demo-autocomplete-shortcut {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.demo-autocomplete-header,
.demo-autocomplete-footer {
  padding: 6px 12px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.demo-autocomplete-item {
  display: flex;
  flex-direction: column;
  padding: 6px 12px;
  line-height: 1.4;
}

.demo-autocomplete-item strong {
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.demo-autocomplete-item span {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.demo-autocomplete-loading {
  padding: 8px 12px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}
</style>
