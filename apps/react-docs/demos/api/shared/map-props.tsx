import { createForm, isVoidField, setValidateLanguage } from '@silver-formily/core'
import { connect, Field, FormConsumer, FormProvider, mapProps } from '@silver-formily/react'
import { Button, Form, Input } from 'antd'

setValidateLanguage('en')

// 对象映射器：key 是字段属性，value 是组件属性（为 true 时属性名相同）
// 函数映射器：直接改写组件 props，可以做更复杂的计算
const FormItem = connect(
  Form.Item,
  mapProps(
    {
      title: 'label',
      description: 'extra',
      required: true,
      validateStatus: true,
    },
    (props, field) => ({
      ...props,
      help: !isVoidField(field) && field.selfErrors.length
        ? field.selfErrors.join(', ')
        : undefined,
    }),
  ),
)

const form = createForm({ validateFirst: true })

function log(...args: unknown[]) {
  console.log(...args)
}

function handleSubmit() {
  form.submit(log)
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
              <Button type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </>
          )}
        </FormConsumer>
      </Form>
    </FormProvider>
  )
}
