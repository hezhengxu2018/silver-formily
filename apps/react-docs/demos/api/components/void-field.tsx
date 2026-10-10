import { createForm } from '@silver-formily/core'
import { Field, FormProvider, VoidField } from '@silver-formily/react'
import '../../demoStyles.css'

const form = createForm()

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field
        name="toggle"
        title="显示子字段"
        component={[Checkbox]}
        decorator={[FormItem, { label: '显示子字段' }]}
      />
      {/* VoidField 隐藏时子节点的数据会同时被清空，再次显示时自动恢复现场 */}
      <VoidField
        name="layout"
        reactions={(field) => {
          const toggle = field.query('.toggle').get('value')
          field.display = toggle ? 'visible' : 'none'
        }}
      >
        <Field name="input" component={[Input]} decorator={[FormItem, { label: '跟随显示的输入框' }]} />
      </VoidField>
    </FormProvider>
  )
}

function FormItem(props: { label?: string, children?: React.ReactNode }) {
  return (
    <div className="demoFormItem">
      <span className="demoFormItemLabel">{props.label}</span>
      {props.children}
    </div>
  )
}

function Checkbox(props: { value?: boolean, onChange?: (value: boolean) => void, label?: string }) {
  return (
    <label className="demoCheckboxLabel">
      <input
        type="checkbox"
        checked={!!props.value}
        onChange={(event) => {
          props.onChange?.(event.target.checked)
        }}
      />
      {props.label}
    </label>
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
