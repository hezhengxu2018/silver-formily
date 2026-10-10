import { createForm } from '@silver-formily/core'
import { connect, Field, FormProvider, mapProps, observer, useForm } from '@silver-formily/react'
import '../../demoStyles.css'

const form = createForm()

// 第三方组件的受控属性不叫 value 而是 text，通过 mapProps 把字段值映射过去
function ThirdPartyInput(props: { text?: string, onChange?: (value: string) => void }) {
  return (
    <input
      className="demoInput"
      value={props.text ?? ''}
      onChange={(event) => {
        props.onChange?.(event.target.value)
      }}
    />
  )
}

const ConnectedInput = connect(
  ThirdPartyInput,
  mapProps({
    value: 'text',
  }),
)

const FormPreview = observer(() => {
  const form = useForm()
  return (
    <div className="demoPreview">
      表单值：
      {String(form.values.input ?? '空')}
    </div>
  )
})

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field name="input" component={[ConnectedInput]} />
      <FormPreview />
    </FormProvider>
  )
}
