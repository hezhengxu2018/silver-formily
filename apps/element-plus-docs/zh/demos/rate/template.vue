<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, Rate, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()

async function log(value) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="rate"
      title="评分"
      :decorator="[FormItem]"
      :component="[Rate]"
    />
    <Field
      name="rate-half"
      title="半星评分"
      :decorator="[FormItem]"
      :component="[Rate, { allowHalf: true }]"
    />
    <Field
      name="rate-text"
      title="显示文字"
      :decorator="[FormItem]"
      :component="[Rate, { showText: true }]"
    />
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
