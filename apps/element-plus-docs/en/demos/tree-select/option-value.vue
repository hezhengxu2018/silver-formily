<script setup lang="ts">
import { createForm } from '@silver-formily/core'
import { FormItem, TreeSelect } from '@silver-formily/element-plus'
import { Field, FormConsumer, FormProvider } from '@silver-formily/vue'

const form = createForm()
const options = [
  { value: 1, label: 'Alpha', extra: 'Not stored in the form' },
  { value: 2, label: 'Beta', extra: 'Not stored in the form' },
]
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="choice"
      title="Projected object value"
      :decorator="[FormItem]"
      :component="[TreeSelect, { optionAsValue: true, optionValueKeys: ['value'], clearable: true }]"
      :data-source="options"
    />
    <FormConsumer v-slot="{ form: currentForm }">
      <pre>{{ JSON.stringify(currentForm.values, null, 2) }}</pre>
    </FormConsumer>
  </FormProvider>
</template>
