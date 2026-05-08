<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Input, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    username: 'silver-formily',
    bio: '让 Form 负责布局和提交，让 Formily 负责校验',
  },
})

async function handleSubmit(values: typeof form.values) {
  await showDemoResult(values)
}
</script>

<template>
  <Form
    :form="form"
    label-width="5em"
    label-align="left"
    :on-auto-submit="handleSubmit"
  >
    <Field
      name="username"
      title="用户名"
      :decorator="[FormItem]"
      :component="[
        Input,
        {
          placeholder: '请输入用户名',
        },
      ]"
    />
    <Field
      name="bio"
      title="简介"
      :decorator="[
        FormItem,
        {
          extra: 'Form 负责统一 labelWidth，FormItem 仍然可以单独覆盖',
          labelAlign: 'top',
        },
      ]"
      :component="[
        Input.TextArea,
        {
          rows: 3,
          placeholder: '介绍一下这版封装思路',
        },
      ]"
    />
    <FormButtonGroup>
      <Submit />
    </FormButtonGroup>
  </Form>
</template>
