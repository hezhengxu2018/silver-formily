<script setup lang="ts">
import { createForm } from '@formily/core'
import { DatePicker, FormItem, FormLayout, Input } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()
</script>

<template>
  <FormProvider :form="form">
    <FormLayout
      :breakpoints="[680]"
      layout="horizontal"
      label-align="left"
      :label-col="6"
      :wrapper-col="10"
      fullness
    >
      <Field
        name="input"
        title="输入框"
        :decorator="[
          FormItem,
          {
            tooltip: '123',
          },
        ]"
        :component="[Input]"
        :required="true"
      />
      <Field
        name="select"
        title="选择框"
        :decorator="[FormItem]"
        :component="[DatePicker]"
        :required="true"
      />
    </FormLayout>
  </FormProvider>
</template>
