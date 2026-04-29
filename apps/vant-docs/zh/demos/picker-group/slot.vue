<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormItem, PickerGroup, PickerPanel } from '@silver-formily/vant'
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
        <template #default="{ dataSource, panelProps }">
          <PickerPanel
            v-bind="panelProps[0]"
            :columns="dataSource[0].options"
          >
            <template #option="option">
              <div class="picker-group-slot-option">
                <span>{{ option.text }}</span>
                <Tag plain size="medium" :type="option.value === 'sh' ? 'danger' : 'primary'">
                  {{ option.value === 'sh' ? '热门' : '常用' }}
                </Tag>
              </div>
            </template>
          </PickerPanel>

          <PickerPanel
            v-bind="panelProps[1]"
            :columns="dataSource[1].options"
          >
            <template #option="option">
              <div class="picker-group-slot-option">
                <span>{{ option.text }}</span>
                <Tag plain size="medium" :type="option.value === 'night' ? 'danger' : 'primary'">
                  {{ option.value === 'night' ? '热门' : '常用' }}
                </Tag>
              </div>
            </template>
          </PickerPanel>
        </template>

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
