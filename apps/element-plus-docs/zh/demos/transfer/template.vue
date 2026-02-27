<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, Submit, Transfer } from '@silver-formily/element-plus'
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
      title="单选"
      :decorator="[FormItem]"
      :component="[Transfer]"
      :data-source="[
        {
          label: '选项1',
          key: 1,
        },
        {
          label: '选项2',
          key: 2,
        },
      ]"
    />
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
