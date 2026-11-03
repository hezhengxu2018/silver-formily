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
import React from 'react'
// Adapted from Alibaba Formily (MIT); see /guide/sources for source and license.
import { DemoConfig } from '../_shared'

const form = createForm()

function OfficialExample() {
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
          <Submit onSubmitFailed={console.log} onSubmit={console.log}>提交</Submit>
        </FormButtonGroup.FormItem>
      </FormLayout>
    </FormProvider>
  )
}

export default function Demo() {
  return <DemoConfig><OfficialExample /></DemoConfig>
}
