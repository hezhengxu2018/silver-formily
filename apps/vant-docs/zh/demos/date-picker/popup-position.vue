<script setup lang="ts">
import { createForm } from '@formily/core'
import { DatePicker, FormItem } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { maxDate, minDate } from './shared'

const form = createForm({
  values: {
    renewalDate: '2026-08-18',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="renewalDate"
        title="顶部弹出"
        :decorator="[FormItem, { isLink: true }]"
        :component="[
          DatePicker,
          {
            position: 'top',
            minDate,
            maxDate,
          },
        ]"
      />
    </div>
  </FormProvider>
</template>
