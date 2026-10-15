import { Checkbox, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({
  initialValues: {
    hobbies: ['eat'],
  },
})

export default function CheckboxBasic() {
  return (
    <FormProvider form={form}>
      <Field
        name="hobbies"
        title="兴趣爱好"
        decorator={[FormItem]}
        component={[Checkbox.Group]}
        dataSource={[
          { label: '吃饭', value: 'eat' },
          { label: '睡觉', value: 'sleep' },
          { label: '打豆豆', value: 'play' },
        ]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
