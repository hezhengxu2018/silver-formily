<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Submit, Upload } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm()

const uploadApiBase = import.meta.env.VITE_UPLOAD_API_BASE?.replace(/\/$/, '')
const uploadAction = uploadApiBase
  ? `${uploadApiBase}/mock/upload`
  : '/mock/upload'

async function showUploadResult(values: Record<string, string[]>) {
  await showDemoResult(values, '上传完成后的字段值')
}
</script>

<template>
  <Form :form="form">
    <Field
      name="attachments"
      title="自动上传"
      description="上传成功后只提交远端 URL，不再提交原始文件对象"
      :decorator="[FormItem, {
        labelAlign: 'top',
      }]"
      :component="[Upload, {
        accept: 'image/*',
        action: uploadAction,
        formatValue: (fileList: any[] = []) => fileList.map(item => item.url),
        maxCount: 2,
        textContent: '上传图片',
      }]"
    />

    <FormButtonGroup>
      <Submit @submit="showUploadResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
