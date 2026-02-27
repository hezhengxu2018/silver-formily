<script lang="ts" setup>
import { createForm } from '@formily/core'
import {
  Form,
  FormButtonGroup,
  FormItem,
  Submit,
  Upload,
} from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'
import { ElButton } from 'element-plus'
import { h } from 'vue'

function UploadButton() {
  return h(ElButton, {}, { default: () => '上传图片' })
}

const form = createForm()
const { SchemaField, SchemaArrayField } = createSchemaField({
  components: {
    FormItem,
    Upload,
  },
})

async function onSubmit(value) {
  console.log(value)
}
</script>

<template>
  <Form :form="form" :label-col="4" :wrapper-col="10">
    <SchemaField>
      <SchemaArrayField
        name="upload"
        title="上传"
        x-decorator="FormItem"
        x-component="Upload"
        :x-component-props="{
          action: 'https://run.mocky.io/v3/4ddf3c65-5202-4b56-87ad-ef7314e84fdc',
          textContent: '上传',
        }"
        required
      />
      <SchemaArrayField
        name="upload2"
        title="卡片上传"
        x-decorator="FormItem"
        x-component="Upload"
        :x-component-props="{
          listType: 'picture-card',
          action: '#',
        }"
        required
      />
      <SchemaArrayField
        name="upload3"
        title="拖拽上传"
        x-decorator="FormItem"
        x-component="Upload"
        :x-component-props="{
          action: 'https://formily-vue.free.beeceptor.com/file',
          textContent: '将文件拖到此处，或者点击上传',
          drag: true,
        }"
        required
      />
      <SchemaArrayField
        name="custom"
        title="自定义按钮"
        x-decorator="FormItem"
        x-component="Upload"
        :x-component-props="{
          action: 'https://formily-vue.free.beeceptor.com/file',
        }"
        required
        :x-content="UploadButton"
      />
    </SchemaField>
    <FormButtonGroup align-form-item>
      <Submit @submit="onSubmit">
        提交
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
