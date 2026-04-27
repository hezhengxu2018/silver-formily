<script setup lang="ts">
import { createForm } from '@formily/core'
import { Calendar, FormItem } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { aprilEnd, marchStart } from './shared'

const form = createForm({
  values: {
    singleDate: '2026-03-23',
    multipleDates: [
      '2026-03-05',
      '2026-03-12',
      '2026-03-19',
    ],
    tripRange: ['2026-03-24', '2026-03-28'],
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="singleDate"
        title="选择单个日期"
        :decorator="[FormItem, { isLink: true }]"
        :component="[
          Calendar,
          {
            minDate: marchStart,
            maxDate: aprilEnd,
          },
        ]"
      />

      <Field
        name="multipleDates"
        title="选择多个日期"
        :decorator="[FormItem, { isLink: true }]"
        :component="[
          Calendar,
          {
            type: 'multiple',
            minDate: marchStart,
            maxDate: aprilEnd,
          },
        ]"
      />

      <Field
        name="tripRange"
        title="选择日期区间"
        :decorator="[FormItem, { isLink: true }]"
        :component="[
          Calendar,
          {
            type: 'range',
            minDate: marchStart,
            maxDate: aprilEnd,
          },
        ]"
      />
    </div>
  </FormProvider>
</template>
