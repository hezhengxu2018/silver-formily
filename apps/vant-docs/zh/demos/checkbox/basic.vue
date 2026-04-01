<script setup lang="ts">
import { createForm } from '@formily/core'
import { Checkbox, Form, FormButtonGroup, FormItem, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'
import { featureOptions } from './shared'

const form = createForm({
  values: {
    features: ['photo', 'location'],
  },
})

async function handleSubmit(values: typeof form.values) {
  await showDemoResult(values)
}
</script>

<template>
  <Form :form="form">
    <Field
      name="features"
      title="采集能力"
      :decorator="[FormItem, { labelAlign: 'top' }]"
      :component="[Checkbox.Group]"
      :data-source="featureOptions"
    />

    <FormButtonGroup>
      <Submit :on-submit="handleSubmit">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
