import { FormButtonGroup, FormItem, Input, Reset } from '@silver-formily/antd'
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
          required
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaField.String
          name="input2"
          title="输入框"
          default="123"
          required
          x-decorator="FormItem"
          x-component="Input"
        />
      </SchemaField>
      <FormButtonGroup>
        <Reset onResetValidateFailed={console.log} forceClear validate>
          重置
        </Reset>
      </FormButtonGroup>
    </FormProvider>
  )
}
