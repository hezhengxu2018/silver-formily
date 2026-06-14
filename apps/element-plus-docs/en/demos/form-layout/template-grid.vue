<script setup lang="ts">
import { createForm } from '@silver-formily/core'
import { FormItem, FormLayout, Input, Select } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()
</script>

<template>
  <FormProvider :form="form">
    <FormLayout
      :breakpoints="[600, 700, 780]"
      layout="horizontal"
      label-align="left"
      :label-col="[4, 6, 8]"
      :wrapper-col="10"
    >
      <Field
        name="input"
        title="Input Input Input Input Input Input"
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
        title="Select Select Select Select Select Select"
        :decorator="[FormItem]"
        :component="[Select]"
        :required="true"
      />
    </FormLayout>
  </FormProvider>
</template>



