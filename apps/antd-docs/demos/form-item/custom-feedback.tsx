import { CheckCircleFilled, LoadingOutlined } from '@ant-design/icons'
import {
  FormItem,
  FormLayout,
  Input,
  NumberPicker,
  Select,
} from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'
import React from 'react'
// Adapted from Alibaba Formily (MIT); see /guide/sources for source and license.
import { DemoConfig } from '../_shared'

const Title = props => <h3>{props.text}</h3>

const SchemaField = createSchemaField({
  components: {
    Input,
    Select,
    NumberPicker,
    FormItem,
    Title,
    FormLayout,
  },
})

const form = createForm()

function OfficialExample() {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String
          title="错误状态(feedbackStatus=error)"
          x-decorator="FormItem"
          x-component="Input"
          description="description"
          x-decorator-props={{
            feedbackStatus: 'error',
          }}
        />

        <SchemaField.String
          title="警告状态(feedbackStatus=warning)"
          x-decorator="FormItem"
          x-component="Input"
          description="description"
          x-decorator-props={{
            feedbackStatus: 'warning',
          }}
        />

        <SchemaField.String
          title="成功状态(feedbackStatus=success)"
          x-decorator="FormItem"
          x-component="Input"
          description="description"
          x-decorator-props={{
            feedbackStatus: 'success',
            feedbackIcon: <CheckCircleFilled style={{ color: '#52c41a' }} />,
          }}
        />

        <SchemaField.String
          title="加载状态(feedbackStatus=pending)"
          x-decorator="FormItem"
          x-component="Input"
          description="description"
          x-decorator-props={{
            feedbackStatus: 'pending',
            feedbackIcon: <LoadingOutlined style={{ color: '#1890ff' }} />,
          }}
        />

        <SchemaField.String
          title="禁用错误状态边框样式(feedbackStatus=error)"
          x-decorator="FormItem"
          x-component="Input"
          description="description"
          x-decorator-props={{
            enableOutlineFeedback: false,
            feedbackStatus: 'error',
          }}
        />

        <SchemaField.Void
          x-component="Title"
          x-component-props={{ text: '反馈信息的布局' }}
        />

        <SchemaField.String
          title="紧凑模式required"
          x-decorator="FormItem"
          x-component="Input"
          required
          x-decorator-props={{
            feedbackLayout: 'terse',
          }}
        />

        <SchemaField.String
          title="紧凑模式有feedback(feedbackLayout=terse)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            feedbackStatus: 'error',
            feedbackText: 'error message',
            feedbackLayout: 'terse',
          }}
        />

        <SchemaField.String
          title="紧凑模式无feedback(feedbackLayout=terse)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            feedbackLayout: 'terse',
          }}
        />

        <SchemaField.String
          title="松散模式(feedbackLayout=loose)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            feedbackStatus: 'error',
            feedbackText: 'error message',
            feedbackLayout: 'loose',
          }}
        />

        <SchemaField.String
          title="弹出模式(feedbackLayout=popover)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            feedbackStatus: 'warning',
            feedbackText: 'warning message',
            feedbackLayout: 'popover',
          }}
        />

        <SchemaField.String
          title="弹出模式(feedbackLayout=popover)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            feedbackStatus: 'error',
            feedbackText: 'error message',
            feedbackLayout: 'popover',
          }}
        />
        <SchemaField.String
          title="弹出模式(feedbackLayout=popover)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            feedbackStatus: 'success',
            feedbackText: 'success message',
            feedbackLayout: 'popover',
          }}
        />

        <SchemaField.Void
          x-component="Title"
          x-component-props={{ text: '组件的适配情况' }}
        />
        <SchemaField.Void
          x-component="FormLayout"
          x-component-props={{ layout: 'vertical' }}
        >
          <SchemaField.String
            title="Select"
            x-decorator="FormItem"
            x-component="Select"
            x-decorator-props={{
              feedbackStatus: 'success',
              feedbackIcon: <CheckCircleFilled style={{ color: '#52c41a' }} />,
            }}
          />

          <SchemaField.String
            title="NumberPicker"
            x-decorator="FormItem"
            x-component="NumberPicker"
            x-decorator-props={{
              feedbackStatus: 'success',
              feedbackIcon: <CheckCircleFilled style={{ color: '#52c41a' }} />,
            }}
          />

        </SchemaField.Void>
      </SchemaField>
    </FormProvider>
  )
}

export default function Demo() {
  return <DemoConfig><OfficialExample /></DemoConfig>
}
