<script setup lang="ts">
import { createForm } from '@formily/core'
import { Calendar, FormItem } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { marchCustomMax, marchCustomMin } from './shared'

const form = createForm({
  values: {
    limitedDate: '2026-03-15',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="limitedDate"
        title="自定义日期范围"
        :decorator="[FormItem, { isLink: true }]"
        :component="[
          Calendar,
          {
            minDate: marchCustomMin,
            maxDate: marchCustomMax,
            placeholder: '仅可选择 03-10 至 03-20',
          },
        ]"
      />
    </div>
  </FormProvider>
</template>
