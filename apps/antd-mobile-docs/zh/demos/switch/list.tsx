import { FormItem, Switch } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { List } from 'antd-mobile'

const form = createForm({
  initialValues: {
    notification: true,
    wifi: false,
  },
})

export default function SwitchList() {
  return (
    <FormProvider form={form}>
      <List>
        <Field
          name="notification"
          title="推送通知"
          decorator={[FormItem]}
          component={[Switch]}
        />
        <Field
          name="wifi"
          title="Wi-Fi"
          decorator={[FormItem]}
          component={[Switch]}
        />
      </List>
    </FormProvider>
  )
}
