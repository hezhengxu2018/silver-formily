<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormItem, Upload } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'

const form = createForm({
  values: {
    attachments: [
      {
        name: '门店照片.jpg',
        url: 'https://cdn.example.com/store-photo.jpg',
      },
      '报修记录.pdf',
    ],
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="attachments"
      title="历史附件"
      description="阅读态会自动把文件值渲染成标签/链接"
      read-pretty
      :decorator="[FormItem, {
        labelAlign: 'top',
      }]"
      :component="[Upload]"
    />
  </Form>
</template>
