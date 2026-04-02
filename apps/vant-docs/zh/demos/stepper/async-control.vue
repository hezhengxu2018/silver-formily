<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Stepper, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { closeToast, showLoadingToast } from 'vant'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    count: 1,
  },
})

function handleBeforeChange() {
  showLoadingToast({
    duration: 0,
    forbidClick: true,
    message: '正在校验',
  })

  return new Promise<boolean>((resolve) => {
    window.setTimeout(() => {
      closeToast()
      resolve(true)
    }, 600)
  })
}
</script>

<template>
  <Form :form="form">
    <Field
      name="count"
      title="异步校验"
      :decorator="[FormItem]"
      :component="[Stepper, { beforeChange: handleBeforeChange }]"
    />

    <FormButtonGroup>
      <Submit :on-submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
