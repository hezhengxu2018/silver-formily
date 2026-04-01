<script setup lang="ts">
import { createForm } from '@formily/core'
import { formilyComputed } from '@silver-formily/reactive-vue'
import { DatePicker, Form, FormButtonGroup, FormItem, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'
import { maxDate, minDate } from './shared'

const form = createForm({
  values: {
    appointmentDate: '30/03/2026',
  },
})

const currentValue = formilyComputed(() => {
  return form.values.appointmentDate as string | undefined
})

async function handleSubmit(values: typeof form.values) {
  await showDemoResult(values)
}
</script>

<template>
  <Form :form="form">
    <div class="demo-panel">
      <Field
        name="appointmentDate"
        title="按 DD/MM/YYYY 提交"
        :decorator="[FormItem, { isLink: true }]"
        :component="[
          DatePicker,
          {
            format: 'YYYY年MM月DD日',
            minDate,
            maxDate,
            valueFormat: 'DD/MM/YYYY',
          },
        ]"
      />

      <div class="demo-value">
        当前写回值：{{ currentValue || '暂无' }}
      </div>
    </div>

    <FormButtonGroup>
      <Submit :on-submit="handleSubmit">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>

<style scoped>
.demo-panel {
  display: grid;
  gap: 12px;
}

.demo-value {
  padding: 0 16px;
  color: var(--van-text-color-2);
  font-size: 14px;
  line-height: 20px;
}
</style>
