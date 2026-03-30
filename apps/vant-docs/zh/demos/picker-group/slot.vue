<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormItem, PickerGroup } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { Tag } from 'vant'
import { appointmentOptions } from './shared'

const form = createForm({
  values: {
    appointment: ['hz', 'am'],
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="appointment"
        title="自定义插槽"
        :decorator="[FormItem, { isLink: true }]"
        :component="[PickerGroup]"
        :data-source="appointmentOptions"
      >
        <template #title>
          <div class="picker-group-slot-title">
            分步选择预约
          </div>
        </template>

        <template #cancel>
          <span class="picker-group-slot-action">关闭</span>
        </template>

        <template #confirm>
          <span class="picker-group-slot-action picker-group-slot-action--confirm">下一步 / 完成</span>
        </template>

        <template #option="option">
          <div class="picker-group-slot-option">
            <span>{{ option.text }}</span>
            <Tag plain size="medium" :type="['sh', 'night'].includes(option.value) ? 'danger' : 'primary'">
              {{ ['sh', 'night'].includes(option.value) ? '热门' : '常用' }}
            </Tag>
          </div>
        </template>
      </Field>
    </div>
  </FormProvider>
</template>

<style scoped>
.picker-group-slot-title {
  padding: 8px 0;
  font-size: 16px;
  font-weight: 600;
}

.picker-group-slot-action {
  font-size: 14px;
  color: var(--van-text-color-2);
}

.picker-group-slot-action--confirm {
  color: var(--van-primary-color);
}

.picker-group-slot-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
}
</style>
