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

const schema = {
  type: 'object',
  properties: {
    base: {
      'type': 'array',
      'title': 'Upload',
      'x-decorator': 'FormItem',
      'x-component': 'Upload',
      'x-component-props': {
        action: 'https://formily-vue.free.beeceptor.com/file',
        textContent: 'Upload',
      },
      'required': true,
    },
    card: {
      'type': 'array',
      'title': 'Card Upload',
      'x-decorator': 'FormItem',
      'x-component': 'Upload',
      'x-component-props': {
        listType: 'picture-card',
        action: 'https://formily-vue.free.beeceptor.com/file',
      },
      'required': true,
    },
    drag: {
      'type': 'array',
      'title': 'Drag Upload',
      'x-decorator': 'FormItem',
      'x-component': 'Upload',
      'x-component-props': {
        action: 'https://formily-vue.free.beeceptor.com/file',
        textContent: 'Drop files here, or click to upload',
        drag: true,
      },
      'required': true,
    },
    custom: {
      'type': 'array',
      'title': 'Custom Button',
      'x-decorator': 'FormItem',
      'x-component': 'Upload',
      'x-component-props': {
        action: 'https://formily-vue.free.beeceptor.com/file',
      },
      'x-content': UploadButton,
      'required': true,
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
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
    <SchemaField :schema="schema" />
    <FormButtonGroup align-form-item>
      <Submit @submit="onSubmit">
        Submit
      </Submit>
    </FormButtonGroup>
  </Form>
</template>



