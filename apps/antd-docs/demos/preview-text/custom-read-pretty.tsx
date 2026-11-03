import {
  FormButtonGroup,
  FormItem,
  FormLayout,
  PreviewText,
} from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import {
  connect,
  createSchemaField,
  FormProvider,
  mapReadPretty,
} from '@silver-formily/react'
import { Input as AntdInput, Button } from 'antd'
import React from 'react'
// Adapted from Alibaba Formily (MIT); see /guide/sources for source and license.
import { DemoConfig } from '../_shared'

const Input = connect(AntdInput, mapReadPretty(PreviewText.Input))

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    PreviewText,
  },
})

const form = createForm()

function OfficialExample() {
  return (
    <PreviewText.Placeholder value="暂无数据">
      <FormLayout labelCol={6} wrapperCol={10}>
        <FormProvider form={form}>
          <SchemaField>
            <SchemaField.Markup
              type="string"
              x-decorator="FormItem"
              title="文本预览"
              required
              x-component="Input"
              default="Hello world"
            />
            <SchemaField.Markup
              type="string"
              x-decorator="FormItem"
              title="选择项预览"
              x-component="PreviewText.Select"
              x-component-props={{
                mode: 'multiple',
              }}
              default={['123']}
              enum={[
                { label: 'A111', value: '123' },
                { label: 'A222', value: '222' },
              ]}
            />
          </SchemaField>
          <FormButtonGroup.FormItem>
            <Button
              onClick={() => {
                form.setState((state) => {
                  state.editable = !state.editable
                })
              }}
            >
              切换阅读态
            </Button>
          </FormButtonGroup.FormItem>
        </FormProvider>
      </FormLayout>
    </PreviewText.Placeholder>
  )
}

export default function Demo() {
  return <DemoConfig><OfficialExample /></DemoConfig>
}
