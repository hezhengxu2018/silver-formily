<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, Submit, TimeSelect } from '@silver-formily/element-plus'
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
      initial-value="12:00 PM"
      :decorator="[FormItem]"
      :component="[
        TimeSelect,
        {
          style: {
            width: '240px',
          },
          start: '00:00',
          step: '00:30',
          end: '23:59',
          placeholder: 'Select time',
          format: 'hh:mm A',
        },
      ]"
    />
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
