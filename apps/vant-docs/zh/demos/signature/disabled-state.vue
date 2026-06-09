<script setup lang="ts">
import { createForm } from '@silver-formily/core'
import { Form, FormItem, Signature } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'

const archivedSignature = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="240" height="120" viewBox="0 0 240 120">
    <rect width="240" height="120" fill="#ffffff" />
    <path
      d="M24 74 C56 18, 92 22, 120 68 S176 110, 218 40"
      fill="none"
      stroke="#0f172a"
      stroke-width="6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`)}`

const form = createForm({
  values: {
    archivedSignature,
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="emptyDisabledSignature"
      title="禁用且无值"
      description="直接展示空占位态，不再渲染签字画板。"
      :decorator="[FormItem, {
        labelAlign: 'top',
      }]"
      :component="[Signature, {
        disabled: true,
      }]"
    />

    <Field
      name="archivedSignature"
      title="禁用但已有值"
      description="会直接进入图片预览态。"
      :decorator="[FormItem, {
        labelAlign: 'top',
      }]"
      :component="[Signature, {
        disabled: true,
      }]"
    />
  </Form>
</template>
