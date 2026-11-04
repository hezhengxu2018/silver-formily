import { CheckListPicker, FormButtonGroup, FormItem, Reset, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'
import { useMemo } from 'react'

const SchemaField = createSchemaField({ components: { FormItem, CheckListPicker } })
const schema = {
  type: 'object',
  properties: {
    fruit: {
      'type': 'array',
      'title': '水果',
      'required': true,
      'enum': [{ label: '苹果', value: 'apple' }, { label: '梨', value: 'pear' }, { label: '香蕉', value: 'banana' }],
      'x-decorator': 'FormItem',
      'x-component': 'CheckListPicker',
      'x-component-props': {
        placeholder: '请选择水果',
        multiple: true,
      },
    },
  },
}

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

export default function BasicDemo() {
  const form = useMemo(() => createForm({ initialValues: { fruit: ['apple', 'pear'] } }), [])
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
