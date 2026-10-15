import { Checkbox, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({
  initialValues: {
    hobbies: ['eat'],
  },
})

export default function CheckboxDisabled() {
  return (
    <FormProvider form={form}>
      <Field
        name="hobbies"
        title="部分禁用"
        decorator={[FormItem]}
        component={[Checkbox.Group]}
        dataSource={[
          { label: '吃饭', value: 'eat' },
          { label: '睡觉', value: 'sleep', disabled: true },
          { label: '打豆豆', value: 'play' },
        ]}
      />
      <Field
        name="frozen"
        title="整体禁用"
        decorator={[FormItem]}
        component={[Checkbox.Group]}
        disabled
        dataSource={[
          { label: '吃饭', value: 'eat' },
          { label: '睡觉', value: 'sleep' },
        ]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
