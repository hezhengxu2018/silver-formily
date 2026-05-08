<script setup lang="ts">
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { Calendar, FormItem } from '@sliver/formily-vant'
import { juneEnd, marchStart } from './shared'

const form = createForm({
  values: {
    scheduleDate: '2026-06-18',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="scheduleDate"
        title="选择切换模式"
        :decorator="[FormItem, { isLink: true }]"
        :component="[
          Calendar,
          {
            switchMode: 'year-month',
            minDate: marchStart,
            maxDate: juneEnd,
          },
        ]"
      />
    </div>
  </FormProvider>
</template>
