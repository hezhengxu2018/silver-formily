import { CheckListPicker, FormButtonGroup, FormItem, Reset, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'
import { useMemo } from 'react'
import { showDemoResult } from '../shared'

const SchemaField = createSchemaField({ components: { FormItem, CheckListPicker } })
const options = Array.from({ length: 100 }, (_, index) => ({
  label: `选项 ${index + 1}`,
  value: index + 1,
}))
const schema = {
  type: 'object',
  properties: {
    single: {
      'type': 'array',
      'title': '长列表单选',
      'enum': options,
      'x-decorator': 'FormItem',
      'x-component': 'CheckListPicker',
      'x-component-props': { placeholder: '请选择一个选项' },
    },
    multiple: {
      'type': 'array',
      'title': '长列表多选',
      'x-decorator-props': { wrapperWrap: true },
      'enum': options,
      'x-decorator': 'FormItem',
      'x-component': 'CheckListPicker',
      'x-component-props': { multiple: true, placeholder: '请选择多个选项' },
    },
  },
}

export default function LongListDemo() {
  const form = useMemo(() => createForm(), [])
  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </FormProvider>
  )
}
