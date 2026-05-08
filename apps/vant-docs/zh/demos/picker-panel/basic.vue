<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, PickerPanel, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { cityOptions } from '../picker/shared'
import { showDemoResult } from '../shared'

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
      :component="[PickerPanel]"
      :data-source="cityOptions"
    />

    <FormButtonGroup>
      <Submit @submit="handleSubmit">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
