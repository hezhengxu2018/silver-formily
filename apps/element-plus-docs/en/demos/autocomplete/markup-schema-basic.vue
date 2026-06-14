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

const cityOptions = [
  { value: 'Beijing' },
  { value: 'Shanghai' },
  { value: 'Guangzhou' },
  { value: 'Shenzhen' },
  { value: 'Hangzhou' },
  { value: 'Chengdu' },
]

async function log(value: any) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="city"
        title="Common Cities"
        x-decorator="FormItem"
        x-component="Autocomplete"
        :x-component-props="{
          triggerOnFocus: true,
          placeholder: 'Enter or choose a city',
          style: { width: '260px' },
        }"
        :enum="cityOptions"
      />
    </SchemaField>
    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>



