<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, Password, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()

async function log(value) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="password"
      title="密码框"
      :decorator="[FormItem]"
      :component="[Password]"
    />
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
