<script setup lang="ts">
import type { PickerOption } from '@silver-formily/vant'
import { createForm } from '@formily/core'
import { FormItem, TimePicker } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm({
  values: {
    currentTime: '08:40',
  },
})

function filter(type: string, options: PickerOption[], values: string[]) {
  const hour = Number(values[0])

  if (type === 'hour') {
    return options.filter((option) => {
      const value = Number(option.value)
      return value >= 8 && value <= 18
    })
  }

  if (type === 'minute') {
    const minuteOptions = options.filter(option => Number(option.value) % 10 === 0)

    if (hour === 8) {
      return minuteOptions.filter(option => Number(option.value) >= 40)
    }

    if (hour === 18) {
      return minuteOptions.filter(option => Number(option.value) <= 20)
    }

    return minuteOptions
  }

  return options
}
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="currentTime"
        title="营业时间段内选择"
        :decorator="[FormItem, { isLink: true }]"
        :component="[TimePicker, { filter }]"
      />
    </div>
  </FormProvider>
</template>
