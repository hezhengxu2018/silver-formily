<script setup lang="ts">
import { createForm } from '@formily/core'
import { Calendar, FormItem } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { aprilEnd, marchStart } from './shared'

const form = createForm({
  values: {
    mondayFirstDate: new Date(2026, 2, 23),
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="mondayFirstDate"
        title="自定义周起始日"
        :decorator="[FormItem, { isLink: true }]"
        :component="[
          Calendar,
          {
            minDate: marchStart,
            maxDate: aprilEnd,
            firstDayOfWeek: 1,
          },
        ]"
      />
    </div>
  </FormProvider>
</template>
