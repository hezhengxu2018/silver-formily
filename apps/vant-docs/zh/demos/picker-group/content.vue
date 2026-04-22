<script setup lang="ts">
import type { PickerGroupResolvedValue } from '@silver-formily/vant'
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, PickerGroup, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { DatePicker, TimePicker } from 'vant'
import { showDemoResult } from '../shared'
import { scheduleTabs } from './shared'

const form = createForm({
  values: {
    schedule: ['2026-03-30', ['09', '30']],
  },
})

const minDate = new Date(2025, 0, 1)
const maxDate = new Date(2027, 11, 31)

function formatSchedule(value: PickerGroupResolvedValue) {
  const [date = '', time = []] = value ?? []

  const dateText = String(date ?? '')
  const timeText = Array.isArray(time)
    ? time.join(':')
    : String(time ?? '')

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
      <DatePicker :min-date="minDate" :max-date="maxDate" />
      <TimePicker />
    </Field>

    <FormButtonGroup>
      <Submit :on-submit="handleSubmit">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
