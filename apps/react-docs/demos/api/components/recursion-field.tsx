import { createForm } from '@silver-formily/core'
import { FormProvider, RecursionField } from '@silver-formily/react'
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

// 独立使用 RecursionField 时，x-component 可以直接传组件引用
const schema = {
  type: 'object',
  properties: {
    input: {
      'type': 'string',
      'x-component': Input,
    },
    object: {
      type: 'object',
      properties: {
        nested: {
          'type': 'string',
          'x-component': Input,
        },
      },
    },
  },
}

export default function Demo() {
  return (
    <FormProvider form={form}>
      <RecursionField schema={schema} />
    </FormProvider>
  )
}
