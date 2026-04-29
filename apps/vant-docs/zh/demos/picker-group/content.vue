<script setup lang="ts">
import type { PickerGroupResolvedValue } from '@silver-formily/vant'
import { createForm } from '@formily/core'
import { DatePickerPanel, Form, FormButtonGroup, FormItem, PickerGroup, Submit, TimePickerPanel } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'
import { scheduleTabs } from './shared'

const form = createForm({
  values: {
    schedule: ['2026-03-30', '09:30'],
  },
})

const minDate = new Date(2025, 0, 1)
const maxDate = new Date(2027, 11, 31)

function formatSchedule(value: PickerGroupResolvedValue) {
  const [date = '', time = ''] = value ?? []

  const dateText = String(date ?? '')
  const timeText = String(time ?? '')

  return [dateText, timeText]
    .filter(Boolean)
    .join(' / ')
}

async function handleSubmit(values: typeof form.values) {
  await showDemoResult(values)
}
</script>

<template>
  <Form :form="form">
    <Field
      name="schedule"
      title="预约时间"
      :decorator="[FormItem, { isLink: true }]"
      :component="[PickerGroup, { displayFormatter: formatSchedule }]"
      :data-source="scheduleTabs"
    >
      <template #default="{ panelProps }">
        <DatePickerPanel
          v-bind="panelProps[0]"
          :min-date="minDate"
          :max-date="maxDate"
        />
        <TimePickerPanel v-bind="panelProps[1]" />
      </template>
    </Field>

    <FormButtonGroup>
      <Submit @submit="handleSubmit">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
