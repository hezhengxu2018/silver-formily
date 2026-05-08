<script setup lang="ts">
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { FormItem, TreeSelect } from '@sliver/formily-vant'
import { categoryItems } from './shared'

const form = createForm({
  readPretty: true,
  values: {
    city: 'shenzhen',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="city"
      title="城市"
      :decorator="[FormItem]"
      :component="[TreeSelect]"
      :data-source="categoryItems"
    />
  </FormProvider>
</template>
