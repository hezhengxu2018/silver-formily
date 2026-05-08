<script setup lang="ts">
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { FormItem, TreeSelect } from '@sliver/formily-vant'
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
      disabled
      :decorator="[FormItem, { isLink: true }]"
      :component="[TreeSelect, { height: 260, title: '禁用态' }]"
      :data-source="categoryItems"
    />
    <Field
      name="readonlyCity"
      title="只读"
      read-only
      :decorator="[FormItem, { isLink: true }]"
      :component="[TreeSelect, { height: 260, title: '只读态' }]"
      :data-source="categoryItems"
    />
  </FormProvider>
</template>
