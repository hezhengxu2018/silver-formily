import type { ISchema } from '@silver-formily/json-schema'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider, RecursionField } from '@silver-formily/react'
import { Input } from 'antd'

const form = createForm()

// 自定义组件内用 RecursionField 只渲染 schema 的 properties 部分
function Custom(props: { name?: string, schema?: ISchema }) {
  return (
    <RecursionField
      name={props.name}
      schema={props.schema}
      onlyRenderProperties
    />
  )
}

const SchemaField = createSchemaField({
  components: {
    Custom,
    Input,
  },
})

export default function Demo() {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Object
          name="custom"
          x-component="Custom"
          x-component-props={{
            schema: {
              type: 'object',
              properties: {
                input: {
                  'type': 'string',
                  'x-component': 'Input',
                },
              },
            },
          }}
        />
      </SchemaField>
    </FormProvider>
  )
}
