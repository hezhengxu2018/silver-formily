<script lang="ts" setup>
import { createForm } from '@formily/core'
import { DatePickerPanel, Form, FormItem, Submit } from '@silver-formily/element-plus'
import { ArrayField, Field } from '@silver-formily/vue'

const form = createForm()

async function onSubmit(value) {
  console.log(value)
}
</script>

<template>
  <Form :form="form" layout="vertical">
    <Field
      name="inlineDate"
      title="内联日期"
      :decorator="[FormItem]"
      :component="[
        DatePickerPanel,
        {
          style: 'width: 340px',
        },
      ]"
    />
    <ArrayField
      name="inlineRange"
      title="内联范围"
      :decorator="[FormItem]"
      :component="[
        DatePickerPanel,
        {
          type: 'daterange',
          style: 'width: 540px',
        },
      ]"
    />
    <Submit style="margin-top: 12px" @submit="onSubmit">
      提交
    </Submit>
  </Form>
</template>
