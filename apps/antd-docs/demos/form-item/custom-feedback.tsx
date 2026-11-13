import { SmileOutlined } from '@ant-design/icons'
import {
  FormItem,
  FormLayout,
  Input,
  InputNumber,
  Select,
} from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'

const Title = props => <h3>{props.text}</h3>

const SchemaField = createSchemaField({
  components: {
    Input,
    Select,
    InputNumber,
    FormItem,
    Title,
    FormLayout,
  },
})

const form = createForm()

export default function OfficialExample() {
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
            hasFeedback: true,
          }}
        />

        <SchemaField.String
          title="加载状态(feedbackStatus=pending)"
          x-decorator="FormItem"
          x-component="Input"
          description="description"
          x-decorator-props={{
            feedbackStatus: 'pending',
            hasFeedback: true,
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

        <SchemaField.String
          title="自定义图标(feedbackIcon)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            feedbackStatus: 'warning',
            feedbackIcon: <SmileOutlined />,
          }}
        />
        <SchemaField.String
          title="关闭图标(hasFeedback=false)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            feedbackStatus: 'warning',
            feedbackIcon: <SmileOutlined />,
            hasFeedback: false,
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
              hasFeedback: true,
            }}
          />

          <SchemaField.String
            title="InputNumber"
            x-decorator="FormItem"
            x-component="InputNumber"
            x-decorator-props={{
              feedbackStatus: 'success',
              hasFeedback: true,
            }}
          />

        </SchemaField.Void>
      </SchemaField>
    </FormProvider>
  )
}
