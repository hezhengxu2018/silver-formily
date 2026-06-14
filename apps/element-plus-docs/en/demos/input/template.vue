<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, Input, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()

function log(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="input"
      title="Input"
      :decorator="[FormItem]"
      :component="[Input]"
    />
    <Field
      name="textarea"
      title="Text Input"
      :decorator="[FormItem]"
      :component="[Input.TextArea]"
    />
    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>



