<script setup lang="ts">
import { createForm } from '@formily/core'
import { Calendar, FormItem } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { aprilEnd, marchStart } from './shared'

const form = createForm({
  values: {
    asideDate: '2026-03-27',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="asideDate"
        title="自定义弹出位置"
        :decorator="[FormItem, { isLink: true }]"
        :component="[
          Calendar,
          {
            position: 'right',
            round: false,
            minDate: marchStart,
            maxDate: aprilEnd,
          },
        ]"
      />
    </div>
  </FormProvider>
</template>
