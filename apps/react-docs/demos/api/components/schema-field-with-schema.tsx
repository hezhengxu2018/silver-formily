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

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

const schema = {
  type: 'object',
  properties: {
    input: {
      'type': 'string',
      'title': '输入框',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    textarea: {
      'type': 'string',
      'title': '多行输入',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': { placeholder: '请输入' },
    },
  },
}

export default function Demo() {
  return (
    <FormProvider form={form}>
      {/* 直接传入 JSON Schema 对象渲染 */}
      <SchemaField schema={schema} />
    </FormProvider>
  )
}
