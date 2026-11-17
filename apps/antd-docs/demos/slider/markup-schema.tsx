import { Form, FormButtonGroup, FormItem, Slider, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField } from '@silver-formily/react'

const SchemaField = createSchemaField({ components: { FormItem, Slider } })

const form = createForm({ initialValues: { value: 20, range: [20, 60], marks: 25 } })

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

function onSubmitFailed(feedbacks: unknown) {
  return Prompts.alert(JSON.stringify(feedbacks, null, 2))
}

export default function Demo() {
  return (
    <Form form={form} labelCol={6} wrapperCol={16}>
      <SchemaField>
        <SchemaField.Number name="value" title="步长" x-decorator="FormItem" x-component="Slider" x-component-props={{ min: 0, max: 100, step: 10 }} />
        <SchemaField.Array name="range" title="范围" x-decorator="FormItem" x-component="Slider" x-component-props={{ range: true, min: 0, max: 100, step: 10 }} />
        <SchemaField.Number name="marks" title="刻度" x-decorator="FormItem" x-component="Slider" x-component-props={{ step: null, marks: { 0: '0%', 25: '25%', 50: '50%', 100: '100%' } }} />
      </SchemaField>
      <FormButtonGroup.FormItem>
        <Submit onSubmitFailed={onSubmitFailed} onSubmit={onSubmit}>提交</Submit>
      </FormButtonGroup.FormItem>
    </Form>
  )
}
