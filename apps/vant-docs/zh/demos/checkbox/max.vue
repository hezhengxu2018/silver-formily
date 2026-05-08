<script setup lang="ts">
import { createForm } from '@formily/core'
import { Checkbox, FormItem } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { channelOptions } from './shared'

const form = createForm({
  values: {
    channels: ['sms'],
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <div class="checkbox-tip">
        最多选择两种提醒方式，适合移动端设置页里比较常见的“偏好开关”场景。
      </div>

      <Field
        name="channels"
        title="提醒方式"
        :decorator="[FormItem, { labelAlign: 'top' }]"
        :component="[Checkbox.Group, { direction: 'horizontal', max: 2, shape: 'square' }]"
        :data-source="channelOptions"
      />
    </div>
  </FormProvider>
</template>

<style scoped>
.checkbox-tip {
  margin-bottom: 12px;
  color: var(--van-text-color-2);
  font-size: 12px;
  line-height: 1.6;
}
</style>
