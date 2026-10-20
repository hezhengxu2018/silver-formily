import { FormButtonGroup, FormGrid, FormItem, FormLayout, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'
import { useMemo } from 'react'
import { showDemoResult } from '../shared'

const SchemaField = createSchemaField({
  components: { FormGrid, FormItem, Input },
})

export default function FormGridSchema() {
  const form = useMemo(() => createForm(), [])
  return (
    <FormProvider form={form}>
      <FormLayout layout="vertical" gridColumnGap={8} gridRowGap={8}>
        <SchemaField
          schema={{
            type: 'object',
            properties: {
              grid: {
                'type': 'void',
                'x-component': 'FormGrid',
                'x-component-props': { minColumns: 2, maxColumns: 2 },
                'properties': {
                  name: {
                    'type': 'string',
                    'title': '姓名',
                    'required': true,
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                  },
                  phone: {
                    'type': 'string',
                    'title': '手机号',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                  },
                  address: {
                    'type': 'string',
                    'title': '地址',
                    'x-decorator': 'FormItem',
                    'x-decorator-props': { gridSpan: 2 },
                    'x-component': 'Input',
                  },
                },
              },
            },
          }}
        />
        <FormButtonGroup>
          <Submit onSubmit={showDemoResult}>提交</Submit>
        </FormButtonGroup>
      </FormLayout>
    </FormProvider>
  )
}
