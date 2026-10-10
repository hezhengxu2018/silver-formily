/* eslint-disable no-template-curly-in-string */
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider, RecordsScope } from '@silver-formily/react'
import { Input } from 'antd'

const form = createForm()

function MyCustomComponent(props) {
  return (
    <RecordsScope getRecords={() => props.records}>
      {props.children}
    </RecordsScope>
  )
}

const SchemaField = createSchemaField({
  components: {
    Input,
    MyCustomComponent,
  },
})

export default () => (
  <FormProvider form={form}>
    <SchemaField
      schema={{
        type: 'object',
        properties: {
          records: {
            'type': 'void',
            'x-component': 'MyCustomComponent',
            'x-component-props': {
              records: [
                {
                  name: 'Name',
                  code: 'Code',
                },
              ],
            },
            'properties': {
              input: {
                'type': 'string',
                'x-component': 'Input',
                'x-value':
                  '{{`'
                  + '${$records[0].name} '
                  + '${$records[0].code} '
                  + '`}}',
              },
            },
          },
        },
      }}
    />
  </FormProvider>
)
