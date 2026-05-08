<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormItem, Picker } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { regionColumns } from './shared'

const form = createForm({
  values: {
    region: ['zj', 'nb'],
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="region"
        title="服务区域"
        :decorator="[FormItem, { isLink: true }]"
        :component="[Picker]"
        :data-source="regionColumns"
      />
    </div>
  </FormProvider>
</template>
