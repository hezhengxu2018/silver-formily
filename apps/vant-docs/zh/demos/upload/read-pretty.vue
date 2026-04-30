<script setup lang="ts">
import type { UploadPreviewFile } from '@silver-formily/vant'
import { createForm } from '@formily/core'
import { Form, FormItem, Upload } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'

function openExternalFile(url: string) {
  window.open(url, '_blank', 'noopener')
}

function isImageFile(file: { file?: File, isImage?: boolean, url?: string }) {
  if (file.isImage) {
    return true
  }

  if (file.file?.type.startsWith('image/')) {
    return true
  }

  return /\.(?:bmp|gif|jpe?g|png|svg|webp)$/i.test(file.url ?? '')
}

const previewFile: UploadPreviewFile = (file) => {
  if (isImageFile(file)) {
    return
  }

  if (file.url) {
    openExternalFile(file.url)
  }
}

const attachmentFiles = [
  {
    name: '门店照片.jpg',
    url: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
  },
  {
    name: '报修记录.pdf',
    url: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
  },
]

const form = createForm({
  values: {
    attachments: attachmentFiles,
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="attachments"
      title="历史附件"
      description="点击文件可按自定义逻辑打开"
      read-pretty
      :decorator="[FormItem, {
        labelAlign: 'top',
      }]"
      :component="[Upload, { previewFile }]"
      :data-source="attachmentFiles"
    />
  </Form>
</template>
