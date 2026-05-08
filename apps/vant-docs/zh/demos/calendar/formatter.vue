<script setup lang="ts">
import type { CalendarDayItem } from '@silver-formily/vant'
import { createForm } from '@formily/core'
import { Calendar, FormItem } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { mayEnd, mayStart } from './shared'

const form = createForm({
  values: {
    holidayRange: ['2026-05-01', '2026-05-04'],
  },
})

function formatter(day: CalendarDayItem) {
  const month = day.date.getMonth() + 1
  const date = day.date.getDate()

  if (month === 5) {
    if (date === 1) {
      day.topInfo = '劳动节'
    }
    else if (date === 4) {
      day.topInfo = '青年节'
    }
    else if (date === 11) {
      day.text = '今天'
    }
  }

  if (day.type === 'start') {
    day.bottomInfo = '入住'
  }
  else if (day.type === 'end') {
    day.bottomInfo = '离店'
  }

  return day
}
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="holidayRange"
        title="自定义日期文案"
        :decorator="[FormItem, { isLink: true }]"
        :component="[
          Calendar,
          {
            type: 'range',
            minDate: mayStart,
            maxDate: mayEnd,
            formatter,
          },
        ]"
      />
    </div>
  </FormProvider>
</template>
