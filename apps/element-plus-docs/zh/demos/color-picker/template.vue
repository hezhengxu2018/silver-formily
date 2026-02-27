<script lang="ts" setup>
import { createForm } from '@formily/core'
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

async function log(value) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="color"
      title="基础用法"
      :decorator="[FormItem]"
      :component="[ColorPicker]"
      default="#409EFF"
    />
    <Field
      name="color-alpha"
      title="透明度"
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
      title="预设色值"
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
      提交
    </Submit>
  </FormProvider>
</template>
