<script setup lang="ts">
import { createForm } from '@formily/core'
import { Field } from '@silver-formily/vue'
import { Form, FormButtonGroup, FormItem, Slider, Submit } from '@sliver/formily-vant'
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
      <Submit @submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
