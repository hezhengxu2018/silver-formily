import { createForm } from '@silver-formily/core'
import { Field, FormProvider, observer, useForm } from '@silver-formily/react'
import { Input, Space } from 'antd'

// 读取响应式模型（Form/Field 等）的自定义组件必须用 observer 包裹，
// 依赖变化时只有当前组件重渲染
const FormPreviewer = observer(() => {
  const form = useForm()
  return (
    <div>
      {JSON.stringify(form.values)}
    </div>
  )
})

const form = createForm({ validateFirst: true })

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Space>
        <Field
          name="name"
          title="Name"
          required
          component={[Input, { placeholder: 'Please Input' }]}
        />
        <FormPreviewer />
      </Space>
    </FormProvider>
  )
}
