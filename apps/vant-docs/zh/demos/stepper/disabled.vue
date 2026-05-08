<script setup lang="ts">
import { createForm } from '@formily/core'
import { Field } from '@silver-formily/vue'
import { Form, FormButtonGroup, FormItem, Stepper, Submit } from '@sliver/formily-vant'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    count: 2,
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="count"
      title="禁用状态"
      :decorator="[FormItem]"
      :component="[Stepper, { disabled: true }]"
    />

    <FormButtonGroup>
      <Submit @submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
