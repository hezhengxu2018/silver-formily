<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
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

  setTimeout(cb, 400, results)
}

async function log(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="language"
        title="Remote Search"
        x-decorator="FormItem"
        x-component="Autocomplete"
        :x-component-props="{
          debounce: 200,
          placeholder: 'Enter a language keyword',
          fetchSuggestions: remoteFetch,
          style: { width: '280px' },
        }"
      />
    </SchemaField>
    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>



