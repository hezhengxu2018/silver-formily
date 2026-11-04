import { FormButtonGroup, FormItem, Submit, Switch } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

const form = createForm({
  initialValues: {
    enabled: true,
  },
})

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

export default function SwitchBasic() {
  return (
    <FormProvider form={form}>
      <Field
        name="enabled"
        title="是否启用"
        decorator={[FormItem]}
        component={[Switch]}
      />
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>查看结果</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
