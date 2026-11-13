import { Checkbox, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

const form = createForm()

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field
        name="single"
        title="是否确认"
        decorator={[FormItem]}
        component={[Checkbox]}
      />
      <Field
        name="multiple"
        title="复选"
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
        decorator={[FormItem]}
        component={[Checkbox.Group]}
      />
      <FormButtonGroup>
        <Submit onSubmitFailed={console.log} onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
