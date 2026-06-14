<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, Submit, TimePicker } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()

function log(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="time"
      title="Time"
      required
      :decorator="[FormItem]"
      :component="[
        TimePicker,
        {
          style: {
            width: '240px',
          },
        },
      ]"
    />
    <Field
      name="[startTime,endTime]"
      title="Time Range"
      :decorator="[FormItem]"
      :component="[
        TimePicker,
        {
          isRange: true,
          style: {
            width: '240px',
          },
        },
      ]"
    />
    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>



