import { createForm } from '@silver-formily/core'
import { Field, FormConsumer, FormProvider } from '@silver-formily/react'
import '../../demoStyles.css'

const form = createForm()

function Input(props: { value?: string, onChange?: (value: string) => void }) {
  return (
    <input
      className="demoInput"
      value={props.value ?? ''}
      onChange={(event) => {
        props.onChange?.(event.target.value)
      }}
    />
  )
}

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field name="input" component={[Input]} />
      {/* children 是函数时，依赖的表单数据变化会触发回调重新执行 */}
      <FormConsumer>
        {(form) => {
          const length = (form.values.input ?? '').length
          return (
            <div className="demoPreview">
              已输入
              {length}
              {' '}
              个字符
            </div>
          )
        }}
      </FormConsumer>
    </FormProvider>
  )
}
