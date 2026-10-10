import { createForm } from '@silver-formily/core'
import { Field, FormProvider, observer, useForm } from '@silver-formily/react'
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

// 依赖 Form 状态的组件需要 observer 包裹才能响应更新
const FormStatus = observer(() => {
  const form = useForm()
  return (
    <div className="demoPreview">
      校验状态：
      {form.invalid ? '校验失败' : '校验通过'}
      （错误数：
      {form.errors.length}
      ）
    </div>
  )
})

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field name="input" required component={[Input]} />
      <div className="demoToolbar">
        <button className="demoButton" onClick={() => form.submit()}>提交触发校验</button>
      </div>
      <FormStatus />
    </FormProvider>
  )
}
