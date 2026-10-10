import { createForm } from '@silver-formily/core'
import { Field, FormProvider, ObjectField, observer, useParentForm } from '@silver-formily/react'
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

// useParentForm 返回最近的 Form 或 ObjectField，方便调用 submit / validate
const SubmitButton = observer(() => {
  const parent = useParentForm()
  return (
    <button className="demoButton" onClick={() => parent?.submit()}>
      提交子表单
    </button>
  )
})

export default function Demo() {
  return (
    <FormProvider form={form}>
      {/* ObjectField 内的 SubmitButton 拿到的是这个 object 字段实例 */}
      <ObjectField name="object">
        <Field name="input" component={[Input]} />
        <div className="demoToolbar">
          <SubmitButton />
        </div>
      </ObjectField>
    </FormProvider>
  )
}
