<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Submit, Upload } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showFailToast } from 'vant'
import { showDemoResult } from '../shared'

const form = createForm()

const uploadAction = 'https://vant.silver-formily.org/mock/upload'

async function afterRead(item: any) {
  item.status = 'uploading'
  item.message = '上传中...'

  try {
    const formData = new FormData()
    formData.append('file', item.file)

    const response = await fetch(uploadAction, {
      body: formData,
      method: 'POST',
    })
    const result = await response.json()

    item.url = result.url
    item.status = 'done'
    item.message = ''
  }
  catch (error) {
    showFailToast(error instanceof Error ? error.message : '上传失败')
    throw error
  }
}

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
        afterRead,
        formatValue: (fileList: any[] = []) => fileList.map(item => item.url),
        maxCount: 2,
        uploadText: '上传图片',
      }]"
    />

    <FormButtonGroup>
      <Submit @submit="showUploadResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
