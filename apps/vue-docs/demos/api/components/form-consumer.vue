<script setup>
import { createForm } from '@formily/core'
import { Field, FormConsumer, FormProvider } from '@silver-formily/vue'
import { ElInput } from 'element-plus'

const form = createForm()
</script>

<template>
  <FormProvider :form="form">
    <Field name="input" :component="[ElInput]" />
    <FormConsumer>
      <template #default="{ form: _form }">
        {{ _form.values.input }}
      </template>
    </FormConsumer>
  </FormProvider>
</template>
