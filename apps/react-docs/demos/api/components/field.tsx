import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import '../../demoStyles.css'

const form = createForm({
  initialValues: {
    input: '初始值',
  },
})

// 受控组件只需消费 value / onChange 即可接入 Field
function Input(props: { value?: string, onChange?: (value: string) => void }) {
  return (
    <input
      className="demoInput"
      value={props.value ?? ''}
      placeholder="请输入"
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
    </FormProvider>
  )
}
