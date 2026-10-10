import { createForm, isVoidField, setValidateLanguage } from '@silver-formily/core'
import { connect, Field, FormProvider, mapProps, mapReadPretty } from '@silver-formily/react'
import { Input as AntdInput, Form } from 'antd'

setValidateLanguage('en')

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

// 大多数第三方组件不支持阅读态，用 mapReadPretty 映射一个阅读态组件即可
function ReadPrettyInput(props: { value?: string }) {
  return <div>{props.value}</div>
}

const Input = connect(
  AntdInput,
  mapReadPretty(ReadPrettyInput),
)

const form = createForm({ validateFirst: true, readPretty: true })

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Form layout="vertical">
        <Field
          name="name"
          title="Name"
          required
          initialValue="Hello world"
          decorator={[FormItem]}
          component={[Input, { placeholder: 'Please Input' }]}
        />
      </Form>
    </FormProvider>
  )
}
