import { FormItem, Switch } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

const form = createForm({
  initialValues: {
    disabled: true,
    loading: false,
    withText: true,
  },
})

export default function SwitchStatus() {
  return (
    <FormProvider form={form}>
      <Field
        name="disabled"
        title="禁用状态"
        decorator={[FormItem]}
        component={[Switch, { disabled: true }]}
      />
      <Field
        name="loading"
        title="加载状态"
        decorator={[FormItem]}
        component={[Switch, { loading: true }]}
      />
      <Field
        name="withText"
        title="开关文案"
        decorator={[FormItem]}
        component={[Switch, { checkedText: '开', uncheckedText: '关' }]}
      />
    </FormProvider>
  )
}
