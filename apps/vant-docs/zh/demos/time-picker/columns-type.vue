<script setup lang="ts">
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { FormItem, TimePicker } from '@sliver/formily-vant'

const form = createForm({
  values: {
    currentTime: '12:00:00',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="currentTime"
        title="选择时分秒"
        :decorator="[FormItem, { isLink: true }]"
        :component="[
          TimePicker,
          {
            columnsType: ['hour', 'minute', 'second'],
          },
        ]"
      />
    </div>
  </FormProvider>
</template>
