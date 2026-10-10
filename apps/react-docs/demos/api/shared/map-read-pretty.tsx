import { createForm } from '@silver-formily/core'
import { connect, Field, FormProvider, mapReadPretty } from '@silver-formily/react'
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

// 大多数第三方组件不支持阅读态，用 mapReadPretty 映射一个阅读态组件即可
function Preview(props: { value?: string }) {
  return <span className="demoText">{props.value || '（空）'}</span>
}

const ConnectedInput = connect(
  Input,
  mapReadPretty(Preview),
)

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field name="input" component={[ConnectedInput]} />
      <div className="demoToolbar">
        <button className="demoButton" onClick={() => form.setPattern('editable')}>编辑态</button>
        <button className="demoButton secondary" onClick={() => form.setPattern('readPretty')}>阅读态</button>
      </div>
    </FormProvider>
  )
}
