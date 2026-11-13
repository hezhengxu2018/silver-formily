import { Form, FormItem, Input, InputNumber, Select } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { Button } from 'antd'
import { useState } from 'react'

const form = createForm({ pattern: 'readPretty', initialValues: { name: '张三', count: 0, role: 'admin' } })

export default function Demo() {
  const [preview, setPreview] = useState(true)
  return (
    <>
      <Form form={form} previewTextPlaceholder="暂无内容" labelWidth={80}>
        <Field name="name" title="姓名" required decorator={[FormItem]} component={[Input]} />
        <Field name="role" title="角色" dataSource={[{ label: '管理员', value: 'admin' }]} decorator={[FormItem]} component={[Select]} />
        <Field name="count" title="数量" decorator={[FormItem]} component={[InputNumber]} />
        <Field name="empty" title="空值" decorator={[FormItem]} component={[Input]} />
      </Form>
      <Button onClick={() => {
        form.setPattern(preview ? 'editable' : 'readPretty')
        setPreview(!preview)
      }}
      >
        {preview ? '切换为编辑态' : '切换为阅读态'}
      </Button>
    </>
  )
}
