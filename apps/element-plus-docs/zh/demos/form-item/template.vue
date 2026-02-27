<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormItem, Input, Submit } from '@silver-formily/element-plus'
import { Field } from '@silver-formily/vue'

const form = createForm()

async function onSubmit(value) {
  console.log(value)
}
</script>

<template>
  <Form :form="form">
    <Field
      name="input"
      title="输入框"
      :decorator="[FormItem]"
      :component="[Input]"
      required
    />
    <Submit @submit="onSubmit">
      提交
    </Submit>
  </Form>
</template>
