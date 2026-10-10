import type { Field as FieldType } from '@silver-formily/core'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider, observer, useField } from '@silver-formily/react'
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

// 自定义组件内通过 useField 读取字段实例，需要 observer 包裹才能响应字段变化
const FieldPreview = observer(() => {
  const field = useField<FieldType>()
  return (
    <div className="demoPreview">
      当前值：
      {String(field?.value ?? '空')}
      （路径：
      {String(field?.path ?? '-')}
      ）
    </div>
  )
})

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field name="input" component={[Input]} />
      <Field name="preview" component={[FieldPreview]} />
    </FormProvider>
  )
}
