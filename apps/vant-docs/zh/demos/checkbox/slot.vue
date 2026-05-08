<script setup lang="ts">
import { createForm } from '@formily/core'
import { Checkbox, FormItem } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { Tag } from 'vant'
import { serviceOptions } from './shared'

const form = createForm({
  values: {
    services: ['express'],
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="services"
        title="增值服务"
        :decorator="[FormItem, { labelAlign: 'top' }]"
        :component="[Checkbox.Group, { direction: 'vertical' }]"
        :data-source="serviceOptions"
      >
        <template #option="{ option }">
          <div class="service-option">
            <div class="service-option__main">
              <div class="service-option__label">
                {{ option.label }}
              </div>
              <div class="service-option__description">
                {{ option.description }}
              </div>
            </div>
            <Tag plain size="medium" type="primary">
              {{ option.tag }}
            </Tag>
          </div>
        </template>
      </Field>
    </div>
  </FormProvider>
</template>

<style scoped>
.service-option {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
}

.service-option__main {
  display: grid;
  gap: 4px;
  flex: 1;
}

.service-option__label {
  color: var(--van-text-color);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  text-align: left;
}

.service-option__description {
  color: var(--van-text-color-2);
  font-size: 12px;
  line-height: 1.5;
  text-align: left;
}
</style>
