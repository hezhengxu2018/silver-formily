<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, Password, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()

function log(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="password"
      title="Password Input"
      :decorator="[FormItem]"
      :component="[Password]"
    />
    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>



