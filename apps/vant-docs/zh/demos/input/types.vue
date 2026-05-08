<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormItem, Input } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm({
  values: {
    mobile: '',
    password: '',
    website: '',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="mobile"
        title="手机号"
        :decorator="[FormItem]"
        :component="[
          Input,
          {
            type: 'tel',
            placeholder: '请输入手机号',
          },
        ]"
      />
      <Field
        name="password"
        title="密码"
        :decorator="[FormItem]"
        :component="[
          Input,
          {
            type: 'password',
            placeholder: '请输入密码',
          },
        ]"
      />
      <Field
        name="website"
        title="个人主页"
        :decorator="[FormItem]"
        :component="[
          Input,
          {
            type: 'url',
            placeholder: 'https://example.com',
          },
        ]"
      />
    </div>
  </FormProvider>
</template>
