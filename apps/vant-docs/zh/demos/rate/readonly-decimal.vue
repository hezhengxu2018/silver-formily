<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Rate, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    score: 3.3,
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="score"
      title="小数只读评分"
      :decorator="[FormItem]"
      :component="[Rate, { allowHalf: true, readonly: true }]"
    />

    <FormButtonGroup>
      <Submit @submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
