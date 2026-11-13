import { FormButtonGroup, FormItem, Picker, Reset, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'

const SchemaField = createSchemaField({ components: { FormItem, Picker } })
const schema = {
  type: 'object',
  properties: {
    fruit: {
      'type': 'array',
      'title': '水果',
      'required': true,
      'enum': [[{ label: '苹果', value: 'apple' }, { label: '梨', value: 'pear' }]],
      'x-decorator': 'FormItem',
      'x-component': 'Picker',
      'x-component-props': {
        placeholder: '请选择水果',
      },
    },
  },
}

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

const form = createForm({ initialValues: { fruit: ['apple'] } })

export default function BasicDemo() {
  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>提交</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </FormProvider>
  )
}
