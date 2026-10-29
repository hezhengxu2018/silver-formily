import { Form, FormButtonGroup, FormItem, FormStep, Input, Submit, useFormStep } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { createSchemaField, observer } from '@silver-formily/react'
import { Button } from 'antd-mobile'
import { useState } from 'react'
import { showDemoResult } from '../shared'

const Actions = observer(() => {
  const step = useFormStep()
  return (
    <FormButtonGroup>
      <Button disabled={!step.allowBack} onClick={() => step.back()}>上一步</Button>
      {step.allowNext
        ? <Button color="primary" onClick={() => step.next()}>下一步</Button>
        : <Submit onSubmit={showDemoResult}>提交</Submit>}
    </FormButtonGroup>
  )
})
const SchemaField = createSchemaField({ components: { FormStep, FormItem, Input, Actions } })

export default function InternalInstanceDemo() {
  const [form] = useState(() => createForm())
  return (
    <Form form={form}>
      <SchemaField schema={{
        type: 'object',
        properties: {
          steps: {
            'type': 'void',
            'x-component': 'FormStep',
            'x-component-props': { hideSteps: true },
            'properties': {
              contact: {
                'type': 'void',
                'title': '联系信息',
                'x-component': 'FormStep.StepPane',
                'properties': {
                  name: { 'type': 'string', 'title': '姓名', 'required': true, 'x-decorator': 'FormItem', 'x-component': 'Input', 'x-component-props': { placeholder: '请输入姓名' } },
                  actions: { 'type': 'void', 'x-component': 'Actions' },
                },
              },
              delivery: {
                'type': 'void',
                'title': '配送信息',
                'x-component': 'FormStep.StepPane',
                'properties': {
                  address: { 'type': 'string', 'title': '地址', 'required': true, 'x-decorator': 'FormItem', 'x-component': 'Input', 'x-component-props': { placeholder: '请输入配送地址' } },
                  actions: { 'type': 'void', 'x-component': 'Actions' },
                },
              },
            },
          },
        },
      }}
      />
    </Form>
  )
}
