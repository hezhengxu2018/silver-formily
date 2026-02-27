<script setup lang="ts">
import { createForm } from '@formily/core'
import {
  FormButtonGroup,
  FormItem,
  FormLayout,
  Input,
  Reset,
  Submit,
} from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()

async function log(...v) {
  console.log(...v)
}
</script>

<template>
  <FormProvider :form="form">
    <FormLayout :label-col="6" :wrapper-col="10">
      <Field name="input1" title="输入框1" :decorator="[FormItem]" :component="[Input]" />
      <Field name="input2" title="输入框2" :decorator="[FormItem]" :component="[Input]" />
      <Field name="input3" title="输入框3" :decorator="[FormItem]" :component="[Input]" />
      <Field name="input4" title="输入框4" :decorator="[FormItem]" :component="[Input]" />
      <Field name="input5" title="输入框5" :decorator="[FormItem]" :component="[Input]" />
      <Field name="input6" title="输入框6" :decorator="[FormItem]" :component="[Input]" />
      <Field name="input7" title="输入框7" :decorator="[FormItem]" :component="[Input]" />
      <Field name="input8" title="输入框8" :decorator="[FormItem]" :component="[Input]" />
      <Field name="input9" title="输入框9" :decorator="[FormItem]" :component="[Input]" />
      <FormButtonGroup.Sticky>
        <FormButtonGroup align="center">
          <Submit @submit="log">
            提交
          </Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </FormButtonGroup.Sticky>
    </FormLayout>
  </FormProvider>
</template>
