<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormItem, Input } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm({
  values: {
    readonlyName: 'silver-formily',
    disabledValue: '当前不可编辑',
    alignValue: '这项内容右对齐展示',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="readonlyName"
        title="只读输入框"
        :decorator="[FormItem]"
        :component="[
          Input,
          {
            readonly: true,
          },
        ]"
      />
      <Field
        name="disabledValue"
        title="禁用输入框"
        :decorator="[FormItem]"
        :component="[
          Input,
          {
            disabled: true,
          },
        ]"
      />
      <Field
        name="alignValue"
        title="内容对齐"
        :decorator="[FormItem]"
        :component="[
          Input,
          {
            inputAlign: 'right',
            placeholder: '输入内容会右对齐',
          },
        ]"
      />
    </div>
  </FormProvider>
</template>
