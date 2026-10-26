import { Form, FormButtonGroup, FormItem, Input, Reset, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { Toast } from 'antd-mobile'
import { useMemo } from 'react'
import { showDemoResult } from '../shared'

export default function FormBasic() {
  const form = useMemo(() => createForm({ initialValues: { username: '张三' } }), [])

  return (
    <Form
      form={form}
      onAutoSubmit={showDemoResult}
      onAutoSubmitFailed={() => Toast.show({ content: '请填写必填项后再提交' })}
    >
      <Field name="username" title="用户名" required decorator={[FormItem]} component={[Input]} />
      <FormButtonGroup layout="horizontal">
        <Reset>重置</Reset>
        <Submit>提交</Submit>
      </FormButtonGroup>
    </Form>
  )
}
