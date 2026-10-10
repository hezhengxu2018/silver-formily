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
    // FormProvider 负责把 form 实例下发给子树的所有字段组件
    <FormProvider form={form}>
      <Field name="input" component={[Input]} />
      <FormConsumer>
        {form => (
          <div className="demoPreview">
            表单值：
            {JSON.stringify(form.values)}
          </div>
        )}
      </FormConsumer>
    </FormProvider>
  )
}
