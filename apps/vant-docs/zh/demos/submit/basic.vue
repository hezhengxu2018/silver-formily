<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Input, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'

const form = createForm({
  values: {
    username: 'silver-formily',
    mobile: '13800138000',
  },
})

async function handleSubmit(values: typeof form.values) {
  await Prompts.alert(`提交结果\n\n${JSON.stringify(values, null, 2)}`)
}
</script>

<template>
  <Form :form="form" label-width="4.5em">
    <Field
      name="username"
      title="用户名"
      :validator="{ required: true, message: '请输入用户名' }"
      :decorator="[FormItem]"
      :component="[Input, { placeholder: '请输入用户名' }]"
    />
    <Field
      name="mobile"
      title="手机号"
      :validator="{ required: true, message: '请输入手机号' }"
      :decorator="[FormItem]"
      :component="[Input, { type: 'tel', placeholder: '请输入手机号' }]"
    />
    <FormButtonGroup>
      <Submit :on-submit="handleSubmit" />
    </FormButtonGroup>
  </Form>
</template>
