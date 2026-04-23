<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Stepper, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    stock: 3,
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="stock"
      title="整数库存"
      :decorator="[FormItem]"
      :component="[Stepper, { integer: true, step: 2 }]"
    />

    <FormButtonGroup>
      <Submit @submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
