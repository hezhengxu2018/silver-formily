<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormItem, Input, Submit } from '@silver-formily/vant'
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
    <div class="demo-actions">
      <Submit :on-submit="handleSubmit" />
    </div>
  </Form>
</template>

<style scoped>
.demo-actions {
  padding: 12px 16px 16px;
}
</style>
