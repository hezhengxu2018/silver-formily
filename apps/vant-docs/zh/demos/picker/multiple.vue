<script setup lang="ts">
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { FormItem, Picker } from '@sliver/formily-vant'
import { scheduleColumns } from './shared'

const form = createForm({
  values: {
    schedule: ['sh', 'night'],
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="schedule"
        title="行程时段"
        :decorator="[FormItem, { isLink: true }]"
        :component="[Picker]"
        :data-source="scheduleColumns"
      />
    </div>
  </FormProvider>
</template>
