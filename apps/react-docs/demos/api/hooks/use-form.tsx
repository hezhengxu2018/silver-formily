import { createForm } from '@silver-formily/core'
import { Field, FormProvider, observer, useForm } from '@silver-formily/react'
import { Input, Space } from 'antd'

// 依赖 Form 状态的组件需要 observer 包裹才能响应更新
const Custom = observer(() => {
  const form = useForm()
  return (
    <div>
      {form.values.input}
    </div>
  )
})

const form = createForm({ validateFirst: true })

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Space>
        <Field name="input" component={[Input]} />
        <Field name="custom" component={[Custom]} />
      </Space>
    </FormProvider>
  )
}
