<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormItem, Picker } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { scheduleColumns } from './shared'

const form = createForm({
  values: {
    schedule: ['sz', 'pm'],
  },
})

function displayFormatter(_value: unknown, selectedOptions: Array<{ text?: any } | undefined>) {
  return selectedOptions
    .map(option => option?.text)
    .filter(Boolean)
    .join(' · ')
}
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="schedule"
        title="自定义文案"
        :decorator="[FormItem, { isLink: true }]"
        :component="[
          Picker,
          {
            displayFormatter,
          },
        ]"
        :data-source="scheduleColumns"
      />
    </div>
  </FormProvider>
</template>
