<script setup lang="ts">
import { createForm } from '@formily/core'
import { DatePicker, FormItem } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm({
  values: {
    billingMonth: '2026-06',
  },
})
const minDate = '2025-01'
const maxDate = '2027-12'
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="billingMonth"
        title="账单月份"
        :decorator="[FormItem, { isLink: true }]"
        :component="[
          DatePicker,
          {
            columnsType: ['year', 'month'],
            minDate,
            maxDate,
          },
        ]"
      />
    </div>
  </FormProvider>
</template>
