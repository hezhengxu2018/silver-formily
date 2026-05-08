<script setup lang="ts">
import { createForm } from '@formily/core'
import { Field } from '@silver-formily/vue'
import { Form, FormButtonGroup, FormItem, Slider, Submit } from '@sliver/formily-vant'
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
      title="指定步长"
      :decorator="[FormItem]"
      :component="[Slider, { step: 10 }]"
    />

    <FormButtonGroup>
      <Submit @submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
