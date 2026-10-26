import { CascadePicker, FormButtonGroup, FormItem, Reset, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'
import { useMemo } from 'react'
import { showDemoResult } from '../shared'
import { options } from './_options'

const SchemaField = createSchemaField({ components: { CascadePicker, FormItem } })
const schema = {
  type: 'object',
  properties: {
    address: {
      'type': 'array',
      'title': '所在地区',
      'required': true,
      'enum': options,
      'x-decorator': 'FormItem',
      'x-decorator-props': { clearable: true },
      'x-component': 'CascadePicker',
      'x-component-props': { placeholder: '请选择省市区' },
    },
  },
}

export default function BasicDemo() {
  const form = useMemo(() => createForm({ initialValues: { address: ['zhejiang', 'hangzhou', 'xihu'] } }), [])
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
