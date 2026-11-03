import { Form, FormButtonGroup, FormItem, Input, Reset } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { useState } from 'react'
import { DemoConfig } from './_shared'

export default function Demo() {
  const [form] = useState(() => createForm({ initialValues: { name: '初始姓名' } }))
  return (
    <DemoConfig>
      <Form form={form} labelWidth={80}>
        <Field name="name" title="姓名" required decorator={[FormItem]} component={[Input]} />
        <FormButtonGroup.FormItem>
          <Reset>恢复初始值</Reset>
          <Reset forceClear>清空</Reset>
          <Reset forceClear validate onResetValidateFailed={() => {}}>清空并校验</Reset>
        </FormButtonGroup.FormItem>
      </Form>
    </DemoConfig>
  )
}
