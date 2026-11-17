import {
  FormButtonGroup,
  FormItem,
  FormLayout,
  Input,
  Select,
  Submit,
} from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

const form = createForm()

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

function onSubmitFailed(feedbacks: unknown) {
  return Prompts.alert(JSON.stringify(feedbacks, null, 2))
}

export default function OfficialExample() {
  return (
    <FormProvider form={form}>
      <FormLayout
        breakpoints={[680]}
        layout={['vertical', 'horizontal']}
        labelAlign={['left', 'right']}
        labelCol={[24, 6]}
        wrapperCol={[24, 10]}
      >
        <Field
          name="input"
          required
          title="输入框"
          decorator={[FormItem]}
          component={[Input]}
        />
        <Field
          name="select"
          required
          title="选择框"
          decorator={[FormItem]}
          component={[Select]}
        />
        <FormButtonGroup.FormItem>
          <Submit onSubmitFailed={onSubmitFailed} onSubmit={onSubmit}>提交</Submit>
        </FormButtonGroup.FormItem>
      </FormLayout>
    </FormProvider>
  )
}
