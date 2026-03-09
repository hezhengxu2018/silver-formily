<script lang="ts" setup>
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { FormItem, Submit, Transfer } from '@sliver/formily-element-plus'

const form = createForm()

function log(value: Record<string, any>) {
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
