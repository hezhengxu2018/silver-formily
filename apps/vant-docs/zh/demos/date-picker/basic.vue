<script setup lang="ts">
import { createForm } from '@formily/core'
import { DatePicker, Form, FormButtonGroup, FormItem, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { maxDate, minDate } from './shared'

const form = createForm({
  values: {
    appointmentDate: '2026-03-30',
  },
})

async function handleSubmit(values: typeof form.values) {
  await Prompts.alert(`提交结果\n\n${JSON.stringify(values, null, 2)}`)
}
</script>

<template>
  <Form :form="form">
    <Field
      name="appointmentDate"
      title="预约日期"
      :decorator="[FormItem, { isLink: true }]"
      :component="[DatePicker, { minDate, maxDate }]"
    />

    <FormButtonGroup>
      <Submit :on-submit="handleSubmit">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
