<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormItem, Signature } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'

const form = createForm()
</script>

<template>
  <Form :form="form">
    <Field
      name="signature"
      title="品牌签名"
      description="使用深色笔迹和浅色底板"
      :decorator="[FormItem, {
        labelAlign: 'top',
      }]"
      :component="[Signature, {
        penColor: '#e11d48',
        lineWidth: 4,
        backgroundColor: '#fff7ed',
        confirmButtonText: '保存签名',
        clearButtonText: '重新签名',
      }]"
    />
  </Form>
</template>
