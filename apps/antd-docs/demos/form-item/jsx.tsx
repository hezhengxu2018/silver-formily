import { FormButtonGroup, FormItem, Input, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import React from 'react'
// Adapted from Alibaba Formily (MIT); see /guide/sources for source and license.
import { DemoConfig } from '../_shared'

const form = createForm()

function OfficialExample() {
  return (
    <FormProvider form={form}>
      <Field
        name="input"
        title="输入框"
        required
        decorator={[FormItem]}
        component={[
          Input,
          {
            style: {
              width: 240,
            },
          },
        ]}
      />
      <FormButtonGroup>
        <Submit onSubmitFailed={console.log} onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}

export default function Demo() {
  return <DemoConfig><OfficialExample /></DemoConfig>
}
