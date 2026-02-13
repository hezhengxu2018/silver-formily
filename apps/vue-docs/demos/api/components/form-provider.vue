<script setup>
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { ElInput } from 'element-plus'

const form = createForm()
</script>

<template>
  <FormProvider :form="form">
    <Field name="input" :component="[ElInput]" />
  </FormProvider>
</template>
