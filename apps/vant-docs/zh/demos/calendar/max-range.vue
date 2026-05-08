<script setup lang="ts">
import { createForm } from '@formily/core'
import { Calendar, FormItem } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { aprilEnd, marchStart } from './shared'

const form = createForm({
  values: {
    shortTrip: null,
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="shortTrip"
        title="日期区间最大范围"
        :decorator="[FormItem, { isLink: true }]"
        :component="[
          Calendar,
          {
            type: 'range',
            minDate: marchStart,
            maxDate: aprilEnd,
            maxRange: 3,
            rangePrompt: '最多选择 3 天',
          },
        ]"
      />
    </div>
  </FormProvider>
</template>
