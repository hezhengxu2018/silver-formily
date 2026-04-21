<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormItem, Picker } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { cityOptions } from './shared'

const form = createForm({
  values: {
    city: 'hz',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="city"
        title="顶部弹出"
        :decorator="[FormItem, { isLink: true }]"
        :component="[
          Picker,
          {
            popupProps: {
              position: 'top',
            },
          },
        ]"
        :data-source="cityOptions"
      />
    </div>
  </FormProvider>
</template>
