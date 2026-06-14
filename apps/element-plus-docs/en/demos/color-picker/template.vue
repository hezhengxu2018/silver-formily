<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { ColorPicker, FormItem, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()
const predefineColors = [
  '#409EFF',
  '#67C23A',
  '#E6A23C',
  '#F56C6C',
  '#909399',
]

function log(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="color"
      title="Basic Usage"
      :decorator="[FormItem]"
      :component="[ColorPicker]"
      default="#409EFF"
    />
    <Field
      name="color-alpha"
      title="Alpha"
      :decorator="[FormItem]"
      :component="[
        ColorPicker,
        {
          showAlpha: true,
        },
      ]"
      default="rgba(255, 69, 0, 0.68)"
    />
    <Field
      name="color-predefine"
      title="Preset Colors"
      :decorator="[FormItem]"
      :component="[
        ColorPicker,
        {
          predefine: predefineColors,
        },
      ]"
      default="#E02020"
    />
    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>



