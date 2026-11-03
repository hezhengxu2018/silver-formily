import { FormButtonGroup, FormItem, NumberPicker, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'
import React from 'react'
// Adapted from Alibaba Formily (MIT); see /guide/sources for source and license.
import { DemoConfig } from '../_shared'

const SchemaField = createSchemaField({
  components: {
    NumberPicker,
    FormItem,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    input: {
      'type': 'string',
      'title': '输入框',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        style: {
          width: 240,
        },
      },
    },
  },
}

function OfficialExample() {
  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
      <FormButtonGroup>
        <Submit onSubmitFailed={console.log} onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}

export default function Demo() {
  return <DemoConfig><OfficialExample /></DemoConfig>
}
