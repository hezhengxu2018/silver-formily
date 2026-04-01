<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Slider, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    progressRange: [20, 60],
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="progressRange"
      title="双滑块"
      :decorator="[FormItem]"
      :component="[Slider, { range: true }]"
    />

    <FormButtonGroup>
      <Submit :on-submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
