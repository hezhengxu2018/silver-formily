<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, PickerGroup, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'
import { appointmentOptions } from './shared'

const form = createForm({
  values: {
    appointment: ['sh', 'night'],
  },
})

async function handleSubmit(values: typeof form.values) {
  await showDemoResult(values)
}
</script>

<template>
  <Form :form="form">
    <Field
      name="appointment"
      title="预约信息"
      :decorator="[FormItem, { isLink: true }]"
      :component="[PickerGroup]"
      :data-source="appointmentOptions"
    />

    <FormButtonGroup>
      <Submit @submit="handleSubmit">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
