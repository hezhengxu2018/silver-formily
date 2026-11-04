import { FormButtonGroup, FormItem, Radio, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

const form = createForm({
  initialValues: {
    hobbies: 'eat',
  },
})

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

export default function RadioBasic() {
  return (
    <FormProvider form={form}>
      <Field
        name="hobbies"
        title="休闲活动"
        decorator={[FormItem]}
        component={[Radio.Group]}
        dataSource={[
          { label: '吃饭', value: 'eat' },
          { label: '睡觉', value: 'sleep' },
          { label: '打豆豆', value: 'play' },
        ]}
      />
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
