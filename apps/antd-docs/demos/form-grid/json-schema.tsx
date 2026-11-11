import { FormGrid, FormItem, Input } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'
// Adapted from Alibaba Formily (MIT); see /guide/sources for source and license.
import React from 'react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    FormGrid,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    grid: {
      'type': 'void',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: [4, 6, 10],
      },
      'properties': {
        aaa: {
          'type': 'string',
          'title': 'AAA',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        bbb: {
          'type': 'string',
          'title': 'BBB',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        ccc: {
          'type': 'string',
          'title': 'CCC',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        ddd: {
          'type': 'string',
          'title': 'DDD',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        eee: {
          'type': 'string',
          'title': 'EEE',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        fff: {
          'type': 'string',
          'title': 'FFF',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        ggg: {
          'type': 'string',
          'title': 'GGG',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    },
  },
}

export default function Example() {
  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
    </FormProvider>
  )
}
