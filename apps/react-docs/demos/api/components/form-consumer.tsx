import { createForm } from '@silver-formily/core'
import { Field, FormConsumer, FormProvider } from '@silver-formily/react'
import { Input } from 'antd'

const form = createForm()

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field name="input" component={[Input]} />
      {/* children 是函数时，依赖的表单数据变化会触发回调重新执行 */}
      <FormConsumer>
        {form => form.values.input ? [<span key="value">{form.values.input}</span>, '（已输入）'] : null}
      </FormConsumer>
    </FormProvider>
  )
}
