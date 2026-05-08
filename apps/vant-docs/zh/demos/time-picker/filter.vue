<script setup lang="ts">
import type { PickerOption } from '@sliver/formily-vant'
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { FormItem, TimePicker } from '@sliver/formily-vant'

const form = createForm({
  values: {
    currentTime: '12:00',
  },
})

function filter(type: string, options: PickerOption[]) {
  if (type === 'minute') {
    return options.filter(option => Number(option.value) % 10 === 0)
  }

  return options
}
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="currentTime"
        title="按 10 分钟间隔选择"
        :decorator="[FormItem, { isLink: true }]"
        :component="[TimePicker, { filter }]"
      />
    </div>
  </FormProvider>
</template>
