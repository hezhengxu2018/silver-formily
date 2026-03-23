<script setup lang="ts">
import { createForm } from '@formily/core'
import { Calendar, FormItem } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { aprilEnd, marchStart } from './shared'

const form = createForm({
  values: {
    singleDate: new Date(2026, 2, 23),
    multipleDates: [
      new Date(2026, 2, 5),
      new Date(2026, 2, 12),
      new Date(2026, 2, 19),
    ],
    tripRange: [new Date(2026, 2, 24), new Date(2026, 2, 28)],
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
