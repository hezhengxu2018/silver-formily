<script lang="ts" setup>
import { createForm } from '@formily/core'
import {
  FormButtonGroup,
  FormItem,
  FormLayout,
  Input,
  Space,
  Submit,
} from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const { SchemaField } = createSchemaField({
  components: {
    FormLayout,
    FormItem,
    Input,
    Space,
  },
})

const schema = {
  type: 'object',
  properties: {
    name: {
      'type': 'void',
      'title': '姓名',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        asterisk: true,
        feedbackLayout: 'none',
      },
      'x-component': 'Space',
      'properties': {
        firstName: {
          'type': 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'required': true,
        },
        lastName: {
          'type': 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'required': true,
        },
      },
    },
    texts: {
      'type': 'void',
      'title': '文本串联',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        asterisk: true,
        feedbackLayout: 'none',
      },
      'x-component': 'Space',
      'properties': {
        aa: {
          'type': 'string',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            addonAfter: '单位',
          },
          'x-component': 'Input',
          'required': true,
        },
        bb: {
          'type': 'string',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            addonAfter: '单位',
          },
          'x-component': 'Input',
          'required': true,
        },
        cc: {
          'type': 'string',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            addonAfter: '单位',
          },
          'x-component': 'Input',
          'required': true,
        },
      },
    },

    textarea: {
      'type': 'string',
      'title': '文本框',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        style: {
          width: 400,
        },
      },
      'required': true,
    },
  },
}

const form = createForm()

async function log(value) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <FormLayout :label-col="6" :wrapper-col="16">
      <SchemaField :schema="schema" />
      <FormButtonGroup align-form-item>
        <Submit @submit="log">
          提交
        </Submit>
      </FormButtonGroup>
    </FormLayout>
  </FormProvider>
</template>
