import { FormButtonGroup, FormItem, NumberPicker, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import React from 'react'
// Adapted from Alibaba Formily (MIT); see /guide/sources for source and license.

const form = createForm()

export default function OfficialExample() {
  return (
    <FormProvider form={form}>
      <Field
        name="input"
        title="输入框"
        required
        decorator={[FormItem]}
        component={[
          NumberPicker,
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
