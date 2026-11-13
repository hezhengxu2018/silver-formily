import { Form, FormButtonGroup, FormItem, Slider, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'

const form = createForm({ initialValues: { value: 20, range: [20, 60], marks: 25 } })

export default function Demo() {
  return (
    <Form form={form} labelCol={6} wrapperCol={16}>
      <Field name="value" title="步长" decorator={[FormItem]} component={[Slider, { min: 0, max: 100, step: 10 }]} />
      <Field name="range" title="范围" decorator={[FormItem]} component={[Slider, { range: true, min: 0, max: 100, step: 10 }]} />
      <Field name="marks" title="刻度" decorator={[FormItem]} component={[Slider, { step: null, marks: { 0: '0%', 25: '25%', 50: '50%', 100: '100%' } }]} />
      <FormButtonGroup.FormItem>
        <Submit onSubmitFailed={console.log} onSubmit={console.log}>提交</Submit>
      </FormButtonGroup.FormItem>
    </Form>
  )
}
