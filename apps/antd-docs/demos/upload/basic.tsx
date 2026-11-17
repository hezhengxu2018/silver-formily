import { Form, FormItem, Reset, Submit, Upload } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { Button, Space } from 'antd'


const form = createForm({ initialValues: { value: [] } })

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

export default function Demo() {
  return (
    <Form form={form} labelCol={6} wrapperCol={16}>
      <Field name="value" title="上传" decorator={[FormItem]} component={[Upload, { customRequest: ({ onSuccess }) => { setTimeout(() => onSuccess?.({ ok: true }), 300) }, children: <Button>选择文件（本地模拟）</Button> }]} />
      <Field name="drag" title="拖拽上传" decorator={[FormItem]} component={[Upload.Dragger, { beforeUpload: () => false, children: <p>拖拽文件到此处，仅保存在表单中</p> }]} />
      <Space wrap>
        <Button onClick={() => form.setPattern(form.pattern === 'readPretty' ? 'editable' : 'readPretty')}>切换阅读态</Button>
        <Reset>重置</Reset>
        <Submit onSubmit={onSubmit}>提交</Submit>
      </Space>
    </Form>
  )
}
