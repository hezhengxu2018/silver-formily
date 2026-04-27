<script setup lang="ts">
import { createForm } from '@formily/core'
import { Calendar, FormItem } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { aprilEnd, marchStart } from './shared'

const form = createForm({
  values: {
    specialDate: '2026-04-08',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="specialDate"
        title="自定义颜色"
        :decorator="[FormItem, { isLink: true }]"
        :component="[
          Calendar,
          {
            color: '#ee0a24',
            minDate: marchStart,
            maxDate: aprilEnd,
          },
        ]"
      />
    </div>
  </FormProvider>
</template>
