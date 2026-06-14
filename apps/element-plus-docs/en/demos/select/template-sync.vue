<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, Select, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()

function log(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="select"
      title="Select"
      :decorator="[FormItem]"
      :component="[
        Select,
        {
          style: {
            width: '240px',
          },
        },
      ]"
      :data-source="[
        {
          label: 'Option 1',
          value: 1,
        },
        {
          label: 'Option 2',
          value: 2,
        },
      ]"
    />

    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>



