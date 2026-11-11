import { FormItem, FormLayout, PreviewText } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'
import dayjs from 'dayjs'
import React from 'react'
// Adapted from Alibaba Formily (MIT); see /guide/sources for source and license.

const SchemaField = createSchemaField({
  components: {
    FormItem,
    PreviewText,
  },
})

const form = createForm()

export default function OfficialExample() {
  return (
    <FormLayout labelCol={6} wrapperCol={10}>
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.String
            x-decorator="FormItem"
            title="文本预览"
            x-component="PreviewText.Input"
            default="Hello world"
          />
          <SchemaField.String
            x-decorator="FormItem"
            title="选择项预览"
            x-component="PreviewText.Select"
            x-component-props={{
              mode: 'multiple',
            }}
            default={['123', '222']}
            enum={[
              { label: 'A111', value: '123' },
              { label: 'A222', value: '222' },
            ]}
          />
          <SchemaField.Object name="date" title="日期预览" x-decorator="FormItem" x-component="PreviewText.DatePicker" default={dayjs('2026-11-06')} />
          <SchemaField.String name="tree" title="树选择预览" x-decorator="FormItem" x-component="PreviewText.TreeSelect" default="city" enum={[{ title: '地区', value: 'region', children: [{ title: '城市', value: 'city' }] }]} />
          <SchemaField.Array name="path" title="级联预览" x-decorator="FormItem" x-component="PreviewText.Cascader" default={['region', 'city']} enum={[{ label: '地区', value: 'region', children: [{ label: '城市', value: 'city' }] }]} />
        </SchemaField>
      </FormProvider>
    </FormLayout>
  )
}
