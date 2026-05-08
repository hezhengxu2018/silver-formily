<script setup lang="ts">
import { createForm } from '@formily/core'
import { DatePickerPanel, Form, FormButtonGroup, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'
import { maxDate, minDate } from './shared'

const form = createForm({
  values: {
    appointmentDate: '2026-03-30',
  },
})

async function handleSubmit(values: typeof form.values) {
  await showDemoResult(values)
}
</script>

<template>
  <Form :form="form">
    <Field
      name="appointmentDate"
      :component="[DatePickerPanel, { minDate, maxDate }]"
    />

    <FormButtonGroup>
      <Submit @submit="handleSubmit">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
