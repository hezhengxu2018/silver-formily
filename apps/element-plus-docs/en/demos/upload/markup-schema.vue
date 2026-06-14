<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
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
  return h(ElButton, {}, { default: () => 'Upload Image' })
}

const form = createForm()
const { SchemaField, SchemaArrayField } = createSchemaField({
  components: {
    FormItem,
    Upload,
  },
})

async function onSubmit(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <Form :form="form" :label-col="4" :wrapper-col="10">
    <SchemaField>
      <SchemaArrayField
        name="upload"
        title="Upload"
        x-decorator="FormItem"
        x-component="Upload"
        :x-component-props="{
          action: 'https://run.mocky.io/v3/4ddf3c65-5202-4b56-87ad-ef7314e84fdc',
          textContent: 'Upload',
        }"
        required
      />
      <SchemaArrayField
        name="upload2"
        title="Card Upload"
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
        title="Drag Upload"
        x-decorator="FormItem"
        x-component="Upload"
        :x-component-props="{
          action: 'https://formily-vue.free.beeceptor.com/file',
          textContent: 'Drop files here, or click to upload',
          drag: true,
        }"
        required
      />
      <SchemaArrayField
        name="custom"
        title="Custom Button"
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
        Submit
      </Submit>
    </FormButtonGroup>
  </Form>
</template>



