import { Form, FormGrid, FormItem, FormLayout, Input, InputNumber, Select } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'

const variants = ['outlined', 'filled', 'borderless', 'underlined'] as const
const options = [{ label: '选项一', value: 'one' }, { label: '选项二', value: 'two' }]

const form = createForm()

export default function Demo() {
  return (
    <Form form={form} layout="vertical">
      <FormGrid minWidth={180} maxColumns={4} columnGap={24}>
        {variants.map(variant => (
          <FormGrid.GridColumn key={variant}>
            <h3 style={{ marginTop: 0 }}>{variant}</h3>
            <FormLayout layout="vertical" variant={variant}>
              <Field name={`${variant}.input`} title="Input" decorator={[FormItem]} component={[Input, { placeholder: '请输入文本' }]} />
              <Field name={`${variant}.select`} title="Select" decorator={[FormItem]} component={[Select, { options, placeholder: '请选择' }]} />
              <Field name={`${variant}.number`} title="InputNumber" decorator={[FormItem]} component={[InputNumber, { placeholder: '请输入数字', style: { width: '100%' } }]} />
              <Field name={`${variant}.notes`} title="TextArea" decorator={[FormItem]} component={[Input.TextArea, { placeholder: '请输入备注', rows: 2 }]} />
            </FormLayout>
          </FormGrid.GridColumn>
        ))}
      </FormGrid>
    </Form>
  )
}
