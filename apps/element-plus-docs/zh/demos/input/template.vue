<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, Input, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()

async function log(value) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="input"
      title="输入框"
      :decorator="[FormItem]"
      :component="[Input]"
    />
    <Field
      name="textarea"
      title="文本框"
      :decorator="[FormItem]"
      :component="[Input.TextArea]"
    />
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
