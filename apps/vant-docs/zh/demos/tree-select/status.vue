<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormItem, TreeSelect } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { categoryItems } from './shared'

const form = createForm({
  values: {
    disabledCity: 'nanjing',
    readonlyCity: 'guangzhou',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="disabledCity"
      title="禁用"
      :decorator="[FormItem, { isLink: true }]"
      :component="[TreeSelect, { disabled: true, height: 260, title: '禁用态' }]"
      :data-source="categoryItems"
    />
    <Field
      name="readonlyCity"
      title="只读"
      :decorator="[FormItem, { isLink: true }]"
      :component="[TreeSelect, { readonly: true, height: 260, title: '只读态' }]"
      :data-source="categoryItems"
    />
  </FormProvider>
</template>
