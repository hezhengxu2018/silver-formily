<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormItem, Input } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="readonlyText"
        title="只读文本"
        initial-value="silver-formily / vant"
        :decorator="[FormItem]"
        :component="[Input]"
        :read-pretty="true"
      />
      <Field
        name="readonlyTextarea"
        title="只读说明"
        initial-value="当前预览态会走 PreviewText.Input，所以能直接看到最终展示结构。"
        :decorator="[FormItem]"
        :component="[Input.TextArea]"
        :read-pretty="true"
      />
    </div>
  </FormProvider>
</template>


