<script setup lang="ts">
import { createForm } from '@formily/core'
import { PasswordInput } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm({
  values: {
    paymentPassword: '',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="paymentPassword"
        :component="[
          PasswordInput,
          {
            keyboard: {
              title: '请输入支付密码',
            },
            length: 6,
          },
        ]"
      />
    </div>
  </FormProvider>
</template>
