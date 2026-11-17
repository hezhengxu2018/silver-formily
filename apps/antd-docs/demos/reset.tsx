import { Form, FormButtonGroup, FormItem, Input, Reset } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'

const form = createForm({ initialValues: { name: '初始姓名' } })

function onResetValidateFailed(feedbacks: unknown) {
  return Prompts.alert(JSON.stringify(feedbacks, null, 2))
}

export default function Demo() {
  return (
    <Form form={form} labelWidth={80}>
      <Field name="name" title="姓名" required decorator={[FormItem]} component={[Input]} />
      <FormButtonGroup.FormItem>
        <Reset>恢复初始值</Reset>
        <Reset forceClear>清空</Reset>
        <Reset forceClear validate onResetValidateFailed={onResetValidateFailed}>清空并校验</Reset>
      </FormButtonGroup.FormItem>
    </Form>
  )
}
