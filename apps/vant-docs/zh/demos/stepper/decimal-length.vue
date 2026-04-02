<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Stepper, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    weight: 1,
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="weight"
      title="商品重量"
      :decorator="[FormItem]"
      :component="[Stepper, { step: 0.2, decimalLength: 1, min: 1, max: 3 }]"
    />

    <FormButtonGroup>
      <Submit :on-submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
