<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Slider, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    volume: 45,
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="volume"
      title="只读音量"
      :read-only="true"
      :decorator="[FormItem]"
      :component="[Slider, { step: 5 }]"
    />

    <FormButtonGroup>
      <Submit @submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
