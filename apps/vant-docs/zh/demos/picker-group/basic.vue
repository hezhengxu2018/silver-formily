<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, PickerGroup, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { appointmentOptions } from './shared'

const form = createForm({
  values: {
    appointment: ['sh', 'night'],
  },
})

async function handleSubmit(values: typeof form.values) {
  await Prompts.alert(`提交结果\n\n${JSON.stringify(values, null, 2)}`)
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
      <Submit :on-submit="handleSubmit">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
