<script setup lang="ts">
import type { CalendarModelValue } from '@silver-formily/vant'
import { createForm } from '@formily/core'
import { Calendar, FormItem } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { showToast } from 'vant'
import { aprilEnd, formatModelValue, marchStart } from './shared'

const form = createForm({
  values: {
    expressDate: null,
  },
})

function onConfirm(value: CalendarModelValue) {
  showToast(`已确认：${formatModelValue(value)}`)
}
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="expressDate"
        title="快捷选择"
        :decorator="[FormItem, { isLink: true }]"
        :component="[
          Calendar,
          {
            minDate: marchStart,
            maxDate: aprilEnd,
            showConfirm: false,
            placeholder: '选择后会立即确认',
            onConfirm,
          },
        ]"
      />
    </div>
  </FormProvider>
</template>
