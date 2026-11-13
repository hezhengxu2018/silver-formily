import { Form, FormItem, InputNumber } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { Button } from 'antd'
import { useState } from 'react'

const form = createForm({ initialValues: { count: 0, price: '12.50' } })

export default function Demo() {
  const [preview, setPreview] = useState(false)
  return (
    <>
      <Form form={form} labelWidth={80}>
        <Field name="count" title="数量" decorator={[FormItem]} component={[InputNumber, { min: 0, max: 100 }]} />
        <Field name="price" title="金额" decorator={[FormItem]} component={[InputNumber, { stringMode: true, precision: 2, formatter: value => `￥${value}`, parser: value => value?.replace('￥', '') ?? '' }]} />
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
