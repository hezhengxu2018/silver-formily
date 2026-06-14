<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, Submit, Switch } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()

function log(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="switch"
      title="Switch"
      :decorator="[FormItem]"
      :component="[Switch]"
    />
    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>



