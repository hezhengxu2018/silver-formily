import { Form, FormButtonGroup, FormItem, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

const form = createForm({ initialValues: { address: '上海市' } })

export default function FormInherited() {
  return (
    <FormProvider form={form}>
      <Form layout="vertical" onAutoSubmit={onSubmit}>
        <Field name="address" title="地址" decorator={[FormItem]} component={[Input]} />
        <FormButtonGroup><Submit>提交地址</Submit></FormButtonGroup>
      </Form>
    </FormProvider>
  )
}
