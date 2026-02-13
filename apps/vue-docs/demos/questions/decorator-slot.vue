<script setup lang="ts">
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { ElFormItem, ElInput } from 'element-plus'

const form = createForm()

const decoratorSlots = {
  label: {
    setup() {
      return () => '邮箱'
    },
  },
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="email"
      :decorator="[ElFormItem]"
      :decorator-content="decoratorSlots"
      :component="[ElInput]"
    />
  </FormProvider>
</template>
