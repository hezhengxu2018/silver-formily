import { createForm, isVoidField } from '@silver-formily/core'
import { connect, Field, FormProvider, mapProps } from '@silver-formily/react'
import '../../demoStyles.css'

const form = createForm()

function Input(props: { value?: string, onChange?: (value: string) => void, label?: string, hint?: string }) {
  return (
    <div className="demoFormItem">
      {props.label && <span className="demoFormItemLabel">{props.label}</span>}
      <input
        className="demoInput"
        value={props.value ?? ''}
        onChange={(event) => {
          props.onChange?.(event.target.value)
        }}
      />
      {props.hint && <span className="demoText">{props.hint}</span>}
    </div>
  )
}

// 对象映射器：key 是字段属性，value 是组件属性（为 true 时属性名相同）
// 函数映射器：直接改写组件 props，可以做更复杂的计算
const ConnectedInput = connect(
  Input,
  mapProps(
    {
      title: 'label',
    },
    (props, field) => {
      if (isVoidField(field))
        return props
      return {
        ...props,
        hint: field.validating
          ? '校验中...'
          : field.selfErrors.length
            ? `错误：${field.selfErrors[0]}`
            : undefined,
      }
    },
  ),
)

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field name="input" title="用户名" required component={[ConnectedInput]} />
      <div className="demoToolbar">
        <button className="demoButton" onClick={() => form.submit()}>提交触发校验</button>
      </div>
    </FormProvider>
  )
}
