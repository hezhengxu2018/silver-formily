<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Rate, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showRateDemoResult } from './shared'

const form = createForm({
  values: {
    score: 3,
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="score"
      title="禁用评分"
      :decorator="[FormItem]"
      :component="[Rate, { disabled: true }]"
    />

    <FormButtonGroup>
      <Submit :on-submit="showRateDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
