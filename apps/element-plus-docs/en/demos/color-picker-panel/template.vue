<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { ColorPickerPanel, Form, FormItem, Submit } from '@silver-formily/element-plus'
import { Field } from '@silver-formily/vue'

const form = createForm()
const predefine = ['#409eff', '#67c23a', '#e6a23c', 'rgba(255, 69, 0, 0.68)']

async function onSubmit(value: any) {
  console.log(value)
}
</script>

<template>
  <Form :form="form" layout="vertical">
    <Field
      name="primary"
      title="Theme Color"
      :decorator="[FormItem]"
      :component="[
        ColorPickerPanel,
        {
          style: 'width: 320px',
          predefine,
        },
      ]"
    />
    <Field
      name="alpha"
      title="Transparent Theme Color"
      :decorator="[FormItem]"
      :component="[
        ColorPickerPanel,
        {
          showAlpha: true,
          style: 'width: 320px',
        },
      ]"
    />
    <Submit style="margin-top: 12px" @submit="onSubmit">
      Submit
    </Submit>
  </Form>
</template>



