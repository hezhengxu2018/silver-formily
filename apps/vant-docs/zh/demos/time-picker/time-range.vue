<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormItem, TimePicker } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm({
  values: {
    currentTime: '12:35',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="currentTime"
        title="限制小时与分钟范围"
        :decorator="[FormItem, { isLink: true }]"
        :component="[
          TimePicker,
          {
            minHour: 10,
            maxHour: 20,
            minMinute: 30,
            maxMinute: 40,
          },
        ]"
      />
    </div>
  </FormProvider>
</template>
