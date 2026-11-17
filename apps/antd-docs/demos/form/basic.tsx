import {
  Form,
  FormButtonGroup,
  FormGrid,
  FormItem,
  Input,
  Select,
  Submit,
} from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'

const form = createForm()

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

function onSubmitFailed(feedbacks: unknown) {
  return Prompts.alert(JSON.stringify(feedbacks, null, 2))
}

export default function OfficialExample() {
  return (
    <Form
      form={form}
      layout="vertical"
      feedbackLayout="terse"
      onAutoSubmit={onSubmit}
      onAutoSubmitFailed={onSubmitFailed}
    >
      <FormGrid minWidth={180} maxColumns={3} columnGap={16}>
        <Field
          name="aa"
          title="选择框"
          decorator={[FormItem]}
          component={[Select]}
          dataSource={[
            {
              label: '选项1',
              value: 1,
            },
            {
              label: '选项2',
              value: 2,
            },
          ]}
        />
        <Field
          name="bb"
          title="输入框"
          required
          decorator={[FormItem]}
          component={[Input]}
        />
        <Field
          name="cc"
          title="输入框"
          decorator={[FormItem]}
          component={[Input]}
        />
        <Field
          name="dd"
          title="输入框"
          decorator={[FormItem]}
          component={[Input]}
        />
        <Field
          name="ee"
          title="输入框"
          decorator={[FormItem]}
          component={[Input]}
        />
        <FormButtonGroup.FormItem>
          <Submit onSubmitFailed={onSubmitFailed}>查询</Submit>
        </FormButtonGroup.FormItem>
      </FormGrid>
    </Form>
  )
}
