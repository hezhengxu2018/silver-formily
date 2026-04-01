<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Slider, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    progress: 50,
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="progress"
      title="自定义样式"
      :decorator="[FormItem]"
      :component="[Slider, { barHeight: '4px', activeColor: '#ee0a24' }]"
    />

    <FormButtonGroup>
      <Submit :on-submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
