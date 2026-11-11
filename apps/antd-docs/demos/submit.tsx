import { Form, FormItem, Input, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { useState } from 'react'
import { Result } from './_shared'

export default function Demo() {
  const [form] = useState(() => createForm())
  const [result, setResult] = useState<unknown>()
  return (
    <>
      <Form form={form} layout="vertical">
        <Field name="name" title="姓名" required decorator={[FormItem]} component={[Input]} />
        <Submit
          onSubmit={async (values) => {
            await new Promise(resolve => setTimeout(resolve, 800))
            return values
          }}
          onSubmitSuccess={setResult}
          onSubmitFailed={feedbacks => setResult({ error: '请检查表单', feedbacks })}
        >
          异步提交
        </Submit>
      </Form>
      <Result value={result} />
    </>
  )
}
