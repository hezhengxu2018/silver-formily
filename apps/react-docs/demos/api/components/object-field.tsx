import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import '../../demoStyles.css'

const form = createForm()

function ObjectBlock(props: { children?: React.ReactNode }) {
  return <div style={{ padding: '8px 12px', border: '1px dashed var(--vp-c-border)', borderRadius: 8 }}>{props.children}</div>
}

function FormItem(props: { label?: string, children?: React.ReactNode }) {
  return (
    <div className="demoFormItem">
      <span className="demoFormItemLabel">{props.label}</span>
      {props.children}
    </div>
  )
}

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

function Textarea(props: { value?: string, onChange?: (value: string) => void }) {
  return (
    <textarea
      className="demoInput"
      rows={3}
      value={props.value ?? ''}
      onChange={(event) => {
        props.onChange?.(event.target.value)
      }}
    />
  )
}

export default function Demo() {
  return (
    <FormProvider form={form}>
      {/* ObjectField 本身不渲染输入组件，只为子字段提供命名空间 */}
      <Field name="object" component={[ObjectBlock]}>
        <Field name="input" component={[Input]} decorator={[FormItem, { label: '输入框' }]} />
        <Field name="textarea" component={[Textarea]} decorator={[FormItem, { label: '多行输入' }]} />
      </Field>
    </FormProvider>
  )
}
