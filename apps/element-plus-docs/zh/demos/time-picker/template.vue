<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, Submit, TimePicker } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()

async function log(value) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="time"
      title="时间"
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
      title="时间范围"
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
      提交
    </Submit>
  </FormProvider>
</template>
