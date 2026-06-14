<script setup lang="ts">
import { createForm } from '@silver-formily/core'
import { Form, FormItem, Input, Submit } from '@silver-formily/element-plus'
import { Field } from '@silver-formily/vue'

const form = createForm()

async function onSubmit(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <Form :form="form">
    <Field
      name="input"
      title="Input"
      :decorator="[FormItem]"
      :component="[Input]"
      required
    />
    <Submit @submit="onSubmit">
      Submit
    </Submit>
  </Form>
</template>



