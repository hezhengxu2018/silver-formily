<script setup lang="ts">
import { createForm } from '@silver-formily/core'
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

async function log(...v: Record<string, any>[]) {
  console.log(...v)
}
</script>

<template>
  <FormProvider :form="form">
    <FormLayout :label-col="6" :wrapper-col="10">
      <Field name="input1" title="Input 1" :decorator="[FormItem]" :component="[Input]" />
      <Field name="input2" title="Input 2" :decorator="[FormItem]" :component="[Input]" />
      <Field name="input3" title="Input 3" :decorator="[FormItem]" :component="[Input]" />
      <Field name="input4" title="Input 4" :decorator="[FormItem]" :component="[Input]" />
      <Field name="input5" title="Input 5" :decorator="[FormItem]" :component="[Input]" />
      <Field name="input6" title="Input 6" :decorator="[FormItem]" :component="[Input]" />
      <Field name="input7" title="Input 7" :decorator="[FormItem]" :component="[Input]" />
      <Field name="input8" title="Input 8" :decorator="[FormItem]" :component="[Input]" />
      <Field name="input9" title="Input 9" :decorator="[FormItem]" :component="[Input]" />
      <FormButtonGroup.Sticky>
        <FormButtonGroup align="center">
          <Submit @submit="log">
            Submit
          </Submit>
          <Reset>Reset</Reset>
        </FormButtonGroup>
      </FormButtonGroup.Sticky>
    </FormLayout>
  </FormProvider>
</template>



