import { createForm, onFormValuesChange } from '@silver-formily/core'
import { Field, FormProvider, useFormEffects } from '@silver-formily/react'
import { useState } from 'react'
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

// 通过 useFormEffects 往当前 Form 注入副作用逻辑，组件卸载时自动清理
function ValuesChangeCounter() {
  const [count, setCount] = useState(0)
  useFormEffects(() => {
    onFormValuesChange(() => {
      setCount(value => value + 1)
    })
  })
  return (
    <div className="demoPreview">
      表单值变化次数：
      {count}
    </div>
  )
}

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field name="input" component={[Input]} />
      <ValuesChangeCounter />
    </FormProvider>
  )
}
