import { Form, FormButtonGroup, FormItem, Input, Reset, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { Button } from 'antd'
import { useState } from 'react'
import { DemoConfig, Result } from './_shared'

export default function Demo() {
  const [form] = useState(() => createForm())
  const [stickyForm] = useState(() => createForm())
  const [result, setResult] = useState<unknown>()
  return (
    <DemoConfig>
      <Form form={form} labelCol={6} wrapperCol={18} onAutoSubmit={setResult}>
        <Field name="name" title="姓名" decorator={[FormItem]} component={[Input]} />
        <FormButtonGroup.FormItem>
          <Submit />
          <Reset />
        </FormButtonGroup.FormItem>
      </Form>
      <p>右对齐</p>
      <FormButtonGroup align="right" gutter={16}>
        <Button>取消</Button>
        <Button type="primary">确定</Button>
      </FormButtonGroup>
      <p>滚动页面查看下面表单的吸底操作栏。它只在所属表单可见时悬浮，滚出表单后恢复原位。</p>
      <Form form={stickyForm} layout="vertical" onAutoSubmit={setResult} style={{ border: '1px solid #8884', padding: 16 }}>
        <Field name="note" title="吸附示例表单" decorator={[FormItem]} component={[Input, { placeholder: '填写后可用吸附按钮提交' }]} />
        <div style={{ minHeight: '110vh' }}>此区域属于同一张表单，操作栏宽度随表单变化。</div>
        <FormButtonGroup.Sticky offsetBottom={16} align="right">
          <FormButtonGroup align="right">
            <Submit>提交这张表单</Submit>
            <Reset />
          </FormButtonGroup>
        </FormButtonGroup.Sticky>
      </Form>
      <div style={{ height: 200, paddingTop: 32 }}>表单结束。继续滚动后，上方操作栏不会跟随到此区域。</div>
      <Result value={result} />
    </DemoConfig>
  )
}
