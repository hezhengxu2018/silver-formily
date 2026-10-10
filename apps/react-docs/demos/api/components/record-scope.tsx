/* eslint-disable no-template-curly-in-string */
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider, RecordScope } from '@silver-formily/react'
import { Input } from 'antd'

const form = createForm()

function MyCustomComponent(props) {
  return (
    <RecordScope getRecord={() => props.record} getIndex={() => props.index}>
      {props.children}
    </RecordScope>
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
          lookup: {
            'type': 'void',
            'x-component': 'MyCustomComponent',
            'x-component-props': {
              record: {
                name: 'Lookup Name',
                code: 'Lookup Code',
              },
              index: 1,
            },
            'properties': {
              record: {
                'type': 'void',
                'x-component': 'MyCustomComponent',
                'x-component-props': {
                  record: {
                    name: 'Name',
                    code: 'Code',
                  },
                  index: 0,
                },
                'properties': {
                  input: {
                    'type': 'string',
                    'x-component': 'Input',
                    'x-value':
                      '{{`'
                      + '${$record.name} '
                      + '${$record.code} '
                      + '${$record.$index} '
                      + '${$record.$lookup.name} '
                      + '${$record.$lookup.code} '
                      + '${$index} '
                      + '${$lookup.name} '
                      + '${$lookup.code} '
                      + '`}}',
                  },
                },
              },
            },
          },
        },
      }}
    />
  </FormProvider>
)
