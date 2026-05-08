<script setup lang="ts">
import { createForm } from '@formily/core'
import { Calendar, FormItem } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { aprilEnd, marchStart } from './shared'

const form = createForm({
  values: {
    stayRange: null,
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="stayRange"
        title="自定义按钮文字"
        :decorator="[FormItem, { isLink: true }]"
        :component="[
          Calendar,
          {
            type: 'range',
            minDate: marchStart,
            maxDate: aprilEnd,
            confirmText: '完成',
            confirmDisabledText: '请选择结束时间',
          },
        ]"
      />
    </div>
  </FormProvider>
</template>
