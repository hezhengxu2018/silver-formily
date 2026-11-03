import { Form, FormItem, Select } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { Button } from 'antd'
import { useState } from 'react'
import { DemoConfig } from './_shared'

const options = [{ label: '管理员', value: 'admin' }, { label: '成员', value: 'member' }]
export default function Demo() {
  const [form] = useState(() => createForm({ initialValues: { roles: ['member'] } }))
  const [preview, setPreview] = useState(false)
  return (
    <DemoConfig>
      <Form form={form} labelWidth={80} fullness>
        <Field name="role" title="角色" dataSource={options} decorator={[FormItem]} component={[Select, { allowClear: true, placeholder: '请选择' }]} />
        <Field name="roles" title="多选" dataSource={options} decorator={[FormItem]} component={[Select, { mode: 'multiple' }]} />
      </Form>
      <Button onClick={() => {
        form.setPattern(preview ? 'editable' : 'readPretty')
        setPreview(!preview)
      }}
      >
        {preview ? '编辑' : '阅读态'}
      </Button>
    </DemoConfig>
  )
}
