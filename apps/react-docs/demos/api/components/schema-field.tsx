import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'
import '../../demoStyles.css'

const form = createForm()

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

// createSchemaField 返回的 SchemaField 上挂载了各 Markup 子组件
const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Textarea,
  },
})

export default function Demo() {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String
          name="input"
          x-decorator="FormItem"
          x-decorator-props={{ label: '输入框' }}
          x-component="Input"
        />
        <SchemaField.String
          name="textarea"
          x-decorator="FormItem"
          x-decorator-props={{ label: '多行输入' }}
          x-component="Textarea"
        />
      </SchemaField>
    </FormProvider>
  )
}
