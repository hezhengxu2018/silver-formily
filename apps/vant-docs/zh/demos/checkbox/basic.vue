<script setup lang="ts">
import { createForm } from '@formily/core'
import { Checkbox, Form, FormButtonGroup, FormItem, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { featureOptions } from './shared'

const form = createForm({
  values: {
    features: ['photo', 'location'],
  },
})

async function handleSubmit(values: typeof form.values) {
  await Prompts.alert(`提交结果\n\n${JSON.stringify(values, null, 2)}`)
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
