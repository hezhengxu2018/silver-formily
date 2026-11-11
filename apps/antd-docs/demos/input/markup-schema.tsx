import { FormButtonGroup, FormItem, Input, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'
import React from 'react'
// Adapted from Alibaba Formily (MIT); see /guide/sources for source and license.

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
})

const form = createForm()

export default function OfficialExample() {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String
          name="input"
          title="输入框"
          x-decorator="FormItem"
          x-component="Input"
          required
          x-component-props={{
            style: {
              width: 240,
            },
          }}
        />
        <SchemaField.String
          name="textarea"
          title="文本框"
          x-decorator="FormItem"
          required
          x-component="Input.TextArea"
          x-component-props={{
            style: {
              width: 400,
            },
          }}
        />
      </SchemaField>
      <FormButtonGroup>
        <Submit onSubmitFailed={console.log} onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
