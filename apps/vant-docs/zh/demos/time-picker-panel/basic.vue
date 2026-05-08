<script setup lang="ts">
import { createForm } from '@formily/core'
import { Field } from '@silver-formily/vue'
import { Form, FormButtonGroup, Submit, TimePickerPanel } from '@sliver/formily-vant'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    appointmentTime: '09:30',
  },
})

async function handleSubmit(values: typeof form.values) {
  await showDemoResult(values)
}
</script>

<template>
  <Form :form="form">
    <Field
      name="appointmentTime"
      :component="[TimePickerPanel, { minTime: '09:00:00', maxTime: '21:30:30' }]"
    />

    <FormButtonGroup>
      <Submit @submit="handleSubmit">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
