import { FormButtonGroup, FormItem, Submit, Switch } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { Toast } from 'antd-mobile'
import { useState } from 'react'
import { showDemoResult } from '../shared'

// 模拟接口请求：resolve 表示成功，reject 表示失败。
async function requestSwitch(succeed: boolean) {
  await new Promise(resolve => setTimeout(resolve, 1500))
  if (!succeed) {
    Toast.show({ icon: 'fail', content: '切换失败，保持原状态' })
    throw new Error('切换失败')
  }
  Toast.show({ icon: 'success', content: '切换成功' })
}

export default function SwitchAsync() {
  const [form] = useState(() => createForm({
    initialValues: {
      success: false,
      failure: true,
    },
  }))

  return (
    <FormProvider form={form}>
      <Field
        name="success"
        title="请求成功"
        decorator={[FormItem]}
        component={[Switch, { beforeChange: () => requestSwitch(true) }]}
      />
      <Field
        name="failure"
        title="请求失败"
        decorator={[FormItem]}
        component={[Switch, { beforeChange: () => requestSwitch(false) }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>查看结果</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
