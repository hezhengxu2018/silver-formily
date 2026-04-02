<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Stepper, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    count: 1,
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="count"
      title="自定义尺寸"
      :decorator="[FormItem]"
      :component="[Stepper, { inputWidth: 48, buttonSize: 32 }]"
    />

    <FormButtonGroup>
      <Submit :on-submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
