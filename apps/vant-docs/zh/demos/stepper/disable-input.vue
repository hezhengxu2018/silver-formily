<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Stepper, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    count: 3,
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="count"
      title="只允许按钮调整"
      :decorator="[FormItem]"
      :component="[Stepper, { disableInput: true }]"
    />

    <FormButtonGroup>
      <Submit @submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
