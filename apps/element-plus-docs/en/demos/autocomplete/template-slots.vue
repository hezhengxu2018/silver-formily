<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { Autocomplete, FormItem, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'
import { ref } from 'vue'

const form = createForm()
const loading = ref(false)

const libraries = [
  { value: 'Vue.js', description: 'A lightweight, progressive MVVM framework' },
  { value: 'React', description: 'A declarative UI library created by Meta' },
  { value: 'Svelte', description: 'A compile-time framework with a smaller runtime footprint' },
  { value: 'SolidJS', description: 'A fine-grained reactive system' },
  { value: 'Angular', description: 'An all-in-one framework with a complete solution' },
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
      title="Recommended Frameworks"
      :decorator="[FormItem]"
      :component="[
        Autocomplete,
        {
          triggerOnFocus: true,
          fetchSuggestions: fetchLibraries,
          placeholder: 'Search or choose a framework',
          style: { width: '320px' },
        },
      ]"
    >
      <template #prefix>
        <span class="demo-autocomplete-chip">Framework</span>
      </template>
      <template #suffix>
        <span class="demo-autocomplete-shortcut">⌘ K</span>
      </template>
      <template #header="{ field }">
        <div class="demo-autocomplete-header">
          Most recent selection: {{ field?.value ?? 'None yet' }}
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
          Loading suggestions...
        </div>
      </template>
      <template #footer>
        <div class="demo-autocomplete-footer">
          Can't find the framework you want?
          <a href="https://github.com/vuejs" target="_blank" rel="noreferrer">Share feedback</a>
        </div>
      </template>
    </Field>
    <Submit style="margin-top: 16px" @submit="log">
      Submit
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




