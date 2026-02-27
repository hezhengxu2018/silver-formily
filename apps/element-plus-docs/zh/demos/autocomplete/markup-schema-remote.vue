<script lang="ts" setup>
import { createForm } from '@formily/core'
import { Autocomplete, FormItem, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Autocomplete,
  },
})

const languageOptions = [
  { value: 'JavaScript' },
  { value: 'TypeScript' },
  { value: 'Python' },
  { value: 'Rust' },
  { value: 'Go' },
  { value: 'Java' },
  { value: 'C#' },
]

function remoteFetch(query: string, cb: (items: typeof languageOptions) => void) {
  const keyword = query?.toLowerCase() ?? ''
  const results = keyword
    ? languageOptions.filter(item => item.value.toLowerCase().includes(keyword))
    : languageOptions

  setTimeout(() => cb(results), 400)
}

async function log(value: any) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="language"
        title="远程搜索"
        x-decorator="FormItem"
        x-component="Autocomplete"
        :x-component-props="{
          debounce: 200,
          placeholder: '输入语言关键词',
          fetchSuggestions: remoteFetch,
          style: { width: '280px' },
        }"
      />
    </SchemaField>
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
