<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Stepper, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    tickets: 1,
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="tickets"
      title="限购张数"
      :decorator="[FormItem]"
      :component="[Stepper, { min: 1, max: 3 }]"
    />

    <FormButtonGroup>
      <Submit @submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
