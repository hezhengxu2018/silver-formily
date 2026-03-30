<script setup lang="ts">
import type { PickerOption } from '@silver-formily/vant'
import { createForm } from '@formily/core'
import { FormItem, TimePicker } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm({
  values: {
    currentTime: '12:00:00',
  },
})

function formatter(type: string, option: PickerOption) {
  if (type === 'hour') {
    option.text += '时'
  }
  if (type === 'minute') {
    option.text += '分'
  }
  if (type === 'second') {
    option.text += '秒'
  }

  return option
}
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="currentTime"
        title="格式化时间选项"
        :decorator="[FormItem, { isLink: true }]"
        :component="[
          TimePicker,
          {
            columnsType: ['hour', 'minute', 'second'],
            formatter,
          },
        ]"
      />
    </div>
  </FormProvider>
</template>
