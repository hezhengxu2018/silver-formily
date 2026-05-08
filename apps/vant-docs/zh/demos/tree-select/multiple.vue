<script setup lang="ts">
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { FormItem, TreeSelect } from '@sliver/formily-vant'
import { categoryItems } from './shared'

const form = createForm({
  values: {
    cities: ['hangzhou', 'suzhou'],
  },
})
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="cities"
      title="常去城市"
      :decorator="[FormItem, { isLink: true }]"
      :component="[TreeSelect, { height: 320, max: 3, title: '选择常去城市' }]"
      :data-source="categoryItems"
    />
  </FormProvider>
</template>
