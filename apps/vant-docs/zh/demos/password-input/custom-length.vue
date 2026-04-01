<script setup lang="ts">
import { createForm } from '@formily/core'
import { PasswordInput } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm({
  values: {
    captcha: '',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="captcha"
        :component="[
          PasswordInput,
          {
            keyboard: {
              title: '请输入验证码',
            },
            length: 4,
          },
        ]"
      />
    </div>
  </FormProvider>
</template>
