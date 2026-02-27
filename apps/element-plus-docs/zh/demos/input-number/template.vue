<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, InputNumber, Submit } from '@silver-formily/element-plus'
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
      :component="[
        InputNumber,
        {
          style: {
            width: '240px',
          },
        },
      ]"
    />
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
