<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Picker, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'
import { cityOptions } from './shared'

const form = createForm({
  values: {
    city: 'sz',
  },
})

async function handleSubmit(values: typeof form.values) {
  await showDemoResult(values)
}
</script>

<template>
  <Form :form="form">
    <Field
      name="city"
      title="出发城市"
      :decorator="[FormItem, { isLink: true }]"
      :component="[Picker, { popupProps: { closeOnClickOverlay: false } }]"
      :data-source="cityOptions"
    />

    <FormButtonGroup>
      <Submit @submit="handleSubmit">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
