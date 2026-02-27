<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, Slider, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()

async function log(value) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="slider"
      title="滑块"
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
      title="区间与刻度"
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
      提交
    </Submit>
  </FormProvider>
</template>
