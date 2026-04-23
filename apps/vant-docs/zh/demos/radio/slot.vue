<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormItem, Radio } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm({
  values: {
    plan: 'pro',
  },
})

const planOptions = [
  {
    label: '标准版',
    value: 'basic',
    description: '适合轻量表单，快速接入移动端页面。',
  },
  {
    label: '专业版',
    value: 'pro',
    description: '适合多步骤提交流程和联动字段较多的场景。',
  },
]
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="plan"
        title="套餐选择"
        :decorator="[FormItem, { labelAlign: 'top' }]"
        :component="[Radio.Group, { direction: 'vertical' }]"
        :data-source="planOptions"
      >
        <template #option="{ option }">
          <div class="plan-option">
            <div class="plan-option__label">
              {{ option.label }}
            </div>
            <div class="plan-option__description">
              {{ option.description }}
            </div>
          </div>
        </template>
      </Field>
    </div>
  </FormProvider>
</template>

<style scoped>
.plan-option {
  display: grid;
  gap: 4px;
}

.plan-option__label {
  color: var(--van-text-color);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  text-align: left;
}

.plan-option__description {
  color: var(--van-text-color-2);
  font-size: 12px;
  line-height: 1.5;
}
</style>
