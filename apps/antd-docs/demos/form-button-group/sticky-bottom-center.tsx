import {
  FormButtonGroup,
  FormItem,
  FormLayout,
  Input,
  Reset,
  Submit,
} from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'
import React from 'react'
// Adapted from Alibaba Formily (MIT); see /guide/sources for source and license.

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

const form = createForm()

export default function OfficialExample() {
  return (
    <FormProvider form={form}>
      <FormLayout labelCol={6} wrapperCol={10} style={{ minHeight: '110vh' }}>
        <SchemaField>
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
        </SchemaField>
        <FormButtonGroup.Sticky align="center">
          <FormButtonGroup>
            <Submit onSubmitFailed={console.log} onSubmit={console.log}>提交</Submit>
            <Reset>重置</Reset>
          </FormButtonGroup>
        </FormButtonGroup.Sticky>
      </FormLayout>
    </FormProvider>
  )
}
