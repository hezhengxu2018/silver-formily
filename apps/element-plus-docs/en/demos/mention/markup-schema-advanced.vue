<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, Mention, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { ref } from 'vue'

const form = createForm()
const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Mention,
  },
})

const reviewerPool = [
  { value: 'Elena', label: 'Elena · Design Reviewer' },
  { value: 'Kingsley', label: 'Kingsley · Engineering Reviewer' },
  { value: 'Doris', label: 'Doris · QA' },
  { value: 'Nico', label: 'Nico · Product' },
]

const reviewerOptions = ref([...reviewerPool])
const mentionLoading = ref(false)

const aliasOptions = [
  { id: 'u1001', nickname: 'Alex (Backend)', inactive: false },
  { id: 'u1002', nickname: 'Becca (Client)', inactive: true },
  { id: 'u1003', nickname: 'Chloe (Visual Design)', inactive: false },
]

function handleSearch(pattern: string) {
  mentionLoading.value = true
  const keyword = pattern.trim().toLowerCase()
  setTimeout(() => {
    reviewerOptions.value = keyword ? reviewerPool.filter(option => option.value.toLowerCase().includes(keyword)) : [...reviewerPool]
    mentionLoading.value = false
  }, 400)
}

function checkReviewer(pattern: string) {
  return reviewerPool.some(option => option.value === pattern)
}

async function log(value: any) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="review"
        title="Review Notes"
        x-decorator="FormItem"
        x-component="Mention"
        default="@Elena, please review the interaction motion. @Kingsley, please keep an eye on performance regressions."
        :x-component-props="{
          rows: 3,
          placeholder: 'Type @ to choose reviewers, with whole-token deletion via Backspace',
          options: reviewerOptions,
          loading: mentionLoading,
          whole: true,
          checkIsWhole: checkReviewer,
          onSearch: handleSearch,
        }"
      />
      <SchemaStringField
        name="alias"
        title="Alias Configuration"
        x-decorator="FormItem"
        x-component="Mention"
        :x-component-props="{
          rows: 2,
          placeholder: 'Map arbitrary fields through props and customize disabled rules',
          options: aliasOptions,
          props: { value: 'id', label: 'nickname', disabled: 'inactive' },
          showArrow: true,
        }"
      />
    </SchemaField>
    <Submit style="margin-top: 12px" @submit="log">
      Save
    </Submit>
  </FormProvider>
</template>



