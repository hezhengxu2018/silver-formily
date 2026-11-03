import { Form, FormItem, Input } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { Slider } from 'antd'
import { useState } from 'react'
import { DemoConfig } from './_shared'

export default function Demo() {
  const [form] = useState(() => createForm())
  const [width, setWidth] = useState(520)
  return (
    <DemoConfig>
      <p>
        调整容器宽度：
        {width}
        px；宽度不超过 400px 时切换为纵向布局。
      </p>
      <Slider min={260} max={760} value={width} onChange={setWidth} aria-label="容器宽度" />
      <Form form={form} style={{ width, maxWidth: '100%' }} breakpoints={[400]} layout={['vertical', 'horizontal']} labelCol={[24, 6]} wrapperCol={[24, 18]} fullness>
        <Field name="name" title="姓名" decorator={[FormItem]} component={[Input]} />
        <Field name="company" title="公司" decorator={[FormItem]} component={[Input]} />
      </Form>
    </DemoConfig>
  )
}
