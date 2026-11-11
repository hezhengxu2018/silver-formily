import { Form, FormItem, Input } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { Button } from 'antd'
import { useState } from 'react'

export default function Demo() {
  const [form] = useState(() => createForm({ initialValues: { name: '张三', notes: '多行文本' } }))
  const [preview, setPreview] = useState(false)
  return (
    <>
      <Form form={form} labelWidth={80} fullness>
        <Field name="name" title="姓名" decorator={[FormItem]} component={[Input, { allowClear: true, placeholder: '请输入姓名' }]} />
        <Field name="notes" title="说明" decorator={[FormItem]} component={[Input.TextArea, { rows: 3 }]} />
      </Form>
      <Button onClick={() => {
        form.setPattern(preview ? 'editable' : 'readPretty')
        setPreview(!preview)
      }}
      >
        {preview ? '编辑' : '阅读态'}
      </Button>
    </>
  )
}
