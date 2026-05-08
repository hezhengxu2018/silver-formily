<script setup lang="ts">
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { FormItem, Input } from '@sliver/formily-vant'

const form = createForm({
  values: {
    username: '',
    email: '',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
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
        name="email"
        title="邮箱"
        :decorator="[FormItem]"
        :component="[
          Input,
          {
            type: 'email',
            placeholder: '请输入联系邮箱',
          },
        ]"
      />
    </div>
  </FormProvider>
</template>
