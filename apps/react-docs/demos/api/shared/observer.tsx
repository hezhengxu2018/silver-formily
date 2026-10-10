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

// 读取响应式模型（Form/Field 等）的自定义组件必须用 observer 包裹，
// 依赖变化时只有当前组件重渲染
const ValuePreview = observer(() => {
  const form = useForm()
  return (
    <div className="demoPreview">
      实时值：
      {String(form.values.input ?? '空')}
      （长度：
      {(form.values.input ?? '').length}
      ）
    </div>
  )
})

// 未用 observer 包裹时，组件只在父级重渲染时才更新
function PlainPreview() {
  const form = useForm()
  return (
    <div className="demoPreview">
      非响应式组件：
      {String(form.values.input ?? '空')}
    </div>
  )
}

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field name="input" component={[Input]} />
      <ValuePreview />
      <PlainPreview />
    </FormProvider>
  )
}
