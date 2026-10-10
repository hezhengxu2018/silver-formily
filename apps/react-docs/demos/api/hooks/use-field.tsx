import type { Field as FieldType } from '@silver-formily/core'
import { createForm, setValidateLanguage } from '@silver-formily/core'
import { Field, FormConsumer, FormProvider, observer, useField } from '@silver-formily/react'
import { Button, Form, Input } from 'antd'

setValidateLanguage('en')

// 装饰器组件内通过 useField 读取字段实例，需要 observer 包裹才能响应字段变化
const FormItem = observer((props: { children?: React.ReactNode }) => {
  const field = useField<FieldType>()
  return (
    <Form.Item
      label={field?.title}
      required={field?.required}
      help={field?.selfErrors?.[0]}
      validateStatus={field?.validateStatus ?? undefined}
    >
      {props.children}
    </Form.Item>
  )
})

const form = createForm({ validateFirst: true })

function log(values: string) {
  console.warn('Form Submitted:', values)
}

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Form layout="vertical">
        <Field
          name="name"
          title="Name"
          required
          decorator={[FormItem]}
          component={[Input, { placeholder: 'Please Input' }]}
        />
        <FormConsumer>
          {_form => (
            <>
              <div style={{ whiteSpace: 'pre', marginBottom: 16 }}>
                {JSON.stringify(_form.values, null, 2)}
              </div>
              <Button type="primary" onClick={() => form.submit(log)}>
                Submit
              </Button>
            </>
          )}
        </FormConsumer>
      </Form>
    </FormProvider>
  )
}
