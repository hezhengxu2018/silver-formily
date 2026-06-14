<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, Rate, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()

function log(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="rate"
      title="Rate"
      :decorator="[FormItem]"
      :component="[Rate]"
    />
    <Field
      name="rate-half"
      title="Half-star Rating"
      :decorator="[FormItem]"
      :component="[Rate, { allowHalf: true }]"
    />
    <Field
      name="rate-text"
      title="Show Text"
      :decorator="[FormItem]"
      :component="[Rate, { showText: true }]"
    />
    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>



