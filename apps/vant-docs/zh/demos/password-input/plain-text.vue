<script setup lang="ts">
import { createForm } from '@formily/core'
import { PasswordInput } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm({
  values: {
    otp: '',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="otp"
        :component="[
          PasswordInput,
          {
            gutter: 8,
            keyboard: {
              title: '请输入短信验证码',
            },
            length: 4,
            mask: false,
          },
        ]"
      />
    </div>
  </FormProvider>
</template>
