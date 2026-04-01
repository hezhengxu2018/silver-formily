<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Slider, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    temperature: 0,
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="temperature"
      title="指定选择范围"
      :decorator="[FormItem]"
      :component="[Slider, { min: -50, max: 50 }]"
    />

    <FormButtonGroup>
      <Submit :on-submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
