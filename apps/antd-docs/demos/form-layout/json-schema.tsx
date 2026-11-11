import { FormItem, FormLayout, Input, Select } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'
import React from 'react'
// Adapted from Alibaba Formily (MIT); see /guide/sources for source and license.

const SchemaField = createSchemaField({
  components: {
    Input,
    Select,
    FormItem,
    FormLayout,
  },
})

const schema = {
  type: 'object',
  properties: {
    layout: {
      'type': 'void',
      'x-component': 'FormLayout',
      'x-component-props': {
        labelCol: 6,
        wrapperCol: 10,
        layout: 'vertical',
      },
      'properties': {
        input: {
          'type': 'string',
          'title': '输入框',
          'required': true,
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            tooltip: <div>123</div>,
          },
          'x-component': 'Input',
        },
        select: {
          'type': 'string',
          'title': '选择框',
          'required': true,
          'x-decorator': 'FormItem',
          'x-component': 'Select',
        },
      },
    },
  },
}

const form = createForm()

export default function OfficialExample() {
  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
    </FormProvider>
  )
}
