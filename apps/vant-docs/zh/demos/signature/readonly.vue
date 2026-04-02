<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormItem, Signature } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'

const readonlySignature = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="240" height="120" viewBox="0 0 240 120">
    <rect width="240" height="120" fill="#ffffff" />
    <path
      d="M20 76 C48 20, 82 26, 110 70 S162 112, 220 42"
      fill="none"
      stroke="#111827"
      stroke-width="6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`)}`

const form = createForm({
  values: {
    signature: readonlySignature,
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="signature"
      title="已存档签名"
      description="只读状态下会回显已有签名"
      :decorator="[FormItem, {
        labelAlign: 'top',
      }]"
      :component="[Signature, {
        readonly: true,
      }]"
    />
  </Form>
</template>
