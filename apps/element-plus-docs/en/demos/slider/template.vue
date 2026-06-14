<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, Slider, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()

function log(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="slider"
      title="Slider"
      :decorator="[FormItem]"
      :component="[
        Slider,
        {
          style: {
            width: '240px',
          },
          showInput: true,
        },
      ]"
      :default="30"
    />
    <Field
      name="slider-range"
      title="Range and Marks"
      :decorator="[FormItem]"
      :component="[
        Slider,
        {
          style: {
            width: '240px',
          },
          range: true,
          marks: {
            0: '0',
            20: '20',
            40: '40',
            60: '60',
            80: '80',
            100: '100',
          },
        },
      ]"
      :default="[20, 60]"
    />
    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>



