<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, Mention, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Mention,
  },
})

const teammateOptions = [
  { value: 'Jasmine', label: 'Jasmine · Product Lead' },
  { value: 'Leo', label: 'Leo · Interaction Designer' },
  { value: 'Mia', label: 'Mia · Frontend Engineer' },
  { value: 'Oscar', label: 'Oscar · QA Engineer' },
]

const topicOptions = [
  { value: 'UX Improvements', label: '#ux-improvements' },
  { value: 'Weekly Release', label: '#weekly-release' },
  { value: 'Performance Tuning', label: '#performance-tuning' },
  { value: 'Risk Alert', label: '#risk-alert' },
]

async function log(value: any) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="status"
        title="Team Updates"
        x-decorator="FormItem"
        x-component="Mention"
        default="Aligned on the interaction draft with @Jasmine today and preparing to sync with @Mia for integration."
        :x-component-props="{
          rows: 3,
          placeholder: 'Type @ to mention teammates',
          options: teammateOptions,
        }"
      />
      <SchemaStringField
        name="timeline"
        title="Update with Topics"
        x-decorator="FormItem"
        x-component="Mention"
        :x-component-props="{
          rows: 3,
          prefix: ['@', '#'],
          split: ' ',
          placeholder: 'Supports both @ teammates and # topics',
          options: [...teammateOptions, ...topicOptions],
        }"
      />
    </SchemaField>
    <Submit style="margin-top: 12px" @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>



