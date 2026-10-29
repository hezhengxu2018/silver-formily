import { Form, FormButtonGroup, FormItem, FormStep, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormConsumer } from '@silver-formily/react'
import { Button } from 'antd-mobile'
import { useState } from 'react'
import { showDemoResult } from '../shared'

const SchemaField = createSchemaField({ components: { FormStep, FormItem, Input } })

export default function BasicDemo() {
  const [form] = useState(() => createForm())
  const [step] = useState(() => FormStep.createFormStep())
  return (
    <Form form={form}>
      <SchemaField>
        <SchemaField.Void name="steps" x-component="FormStep" x-component-props={{ formStep: step }}>
          <SchemaField.Void name="contact" title="联系信息" x-component="FormStep.StepPane" x-component-props={{ description: '填写联系人' }}>
            <SchemaField.String name="name" title="姓名" required x-decorator="FormItem" x-component="Input" x-component-props={{ placeholder: '请输入姓名' }} />
          </SchemaField.Void>
          <SchemaField.Void name="delivery" title="配送信息" x-component="FormStep.StepPane">
            <SchemaField.String name="address" title="地址" required x-decorator="FormItem" x-component="Input" x-component-props={{ placeholder: '请输入配送地址' }} />
          </SchemaField.Void>
          <SchemaField.Void name="confirm" title="确认提交" x-component="FormStep.StepPane">
            <SchemaField.String name="remark" title="备注" x-decorator="FormItem" x-component="Input.TextArea" x-component-props={{ placeholder: '选填' }} />
          </SchemaField.Void>
        </SchemaField.Void>
      </SchemaField>
      <FormConsumer>
        {() => (
          <FormButtonGroup>
            <Button disabled={!step.allowBack} onClick={() => step.back()}>上一步</Button>
            {step.allowNext
              ? <Button color="primary" onClick={() => step.next()}>下一步</Button>
              : <Submit onSubmit={showDemoResult}>提交</Submit>}
          </FormButtonGroup>
        )}
      </FormConsumer>
    </Form>
  )
}
