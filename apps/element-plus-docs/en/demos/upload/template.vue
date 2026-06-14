<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import {
  Form,
  FormButtonGroup,
  FormItem,
  Submit,
  Upload,
} from '@silver-formily/element-plus'
import { ArrayField } from '@silver-formily/vue'
import { ElButton } from 'element-plus'
import { h } from 'vue'

function UploadButton() {
  return h(ElButton, {}, { default: () => 'Upload Image' })
}

const form = createForm()

async function onSubmit(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <Form :form="form" :label-col="4" :wrapper-col="10">
    <ArrayField
      name="upload"
      title="Upload"
      :decorator="[FormItem]"
      :component="[
        Upload,
        {
          action: 'https://formily-vue.free.beeceptor.com/file',
          textContent: 'Upload',
        },
      ]"
      required
    />
    <ArrayField
      name="upload2"
      title="Card Upload"
      :decorator="[FormItem]"
      :component="[
        Upload,
        {
          listType: 'picture-card',
          action: 'https://formily-vue.free.beeceptor.com/file',
        },
      ]"
      required
    />
    <ArrayField
      name="upload3"
      title="Drag Upload"
      :decorator="[FormItem]"
      :component="[
        Upload,
        {
          action: 'https://formily-vue.free.beeceptor.com/file',
          textContent: 'Drop files here, or click to upload',
          drag: true,
        },
      ]"
      required
    />
    <ArrayField
      name="custom"
      title="Custom Button"
      :decorator="[FormItem]"
      :component="[
        Upload,
        {
          action: 'https://formily-vue.free.beeceptor.com/file',
        },
      ]"
      required
    >
      <UploadButton />
    </ArrayField>
    <FormButtonGroup align-form-item>
      <Submit @submit="onSubmit">
        Submit
      </Submit>
    </FormButtonGroup>
  </Form>
</template>



