<script setup lang="ts">
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { ElInput } from 'element-plus'

const form = createForm({
  initialValues: {
    input: '初始值',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <Field name="input" :component="[ElInput, { placeholder: '请输入' }]" />
  </FormProvider>
</template>
