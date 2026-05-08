<script setup lang="ts">
import { createForm } from '@formily/core'
import { Field } from '@silver-formily/vue'
import { Form, FormButtonGroup, FormItem, Stepper, Submit } from '@sliver/formily-vant'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    size: 2,
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="size"
      title="每次加 2"
      :decorator="[FormItem]"
      :component="[Stepper, { step: 2 }]"
    />

    <FormButtonGroup>
      <Submit @submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
