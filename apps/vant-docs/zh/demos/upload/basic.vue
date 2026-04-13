<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Submit, Upload } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm()

async function showUploadResult(values: Record<string, string[]>) {
  await showDemoResult(values)
}
</script>

<template>
  <Form :form="form">
    <Field
      name="attachments"
      title="巡检附件"
      description="适合先选中文件，最后跟随整张表单一起提交"
      :decorator="[FormItem, {
        labelAlign: 'top',
      }]"
      :component="[Upload, {
        accept: 'image/*,.pdf',
        formatValue: (fileList: any[] = []) => fileList.map(item => item.file?.name),
        maxCount: 3,
        textContent: '上传附件',
      }]"
    />

    <FormButtonGroup>
      <Submit :on-submit="showUploadResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
