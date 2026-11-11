import type { Field, FormPathPattern } from '@silver-formily/core'
import { FormButtonGroup, FormItem, Select, Submit } from '@silver-formily/antd'
import { createForm, onFieldReact } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'
import { action } from '@silver-formily/reactive'
import React from 'react'
// Adapted from Alibaba Formily (MIT); see /guide/sources for source and license.

const SchemaField = createSchemaField({
  components: {
    Select,
    FormItem,
  },
})

function useAsyncDataSource(pattern: FormPathPattern, service: (field: Field) => Promise<{ label: string, value: any }[]>) {
  onFieldReact(pattern, (field: Field) => {
    field.loading = true
    service(field).then(
      action.bound((data) => {
        field.dataSource = data
        field.loading = false
      }),
    )
  })
}

const form = createForm({
  effects: () => {
    useAsyncDataSource('select', async (field) => {
      const linkage = field.query('linkage').get('value')
      if (!linkage)
        return []
      return new Promise<{ label: string, value: any }[]>((resolve) => {
        setTimeout(() => {
          if (linkage === 1) {
            resolve([
              {
                label: 'AAA',
                value: 'aaa',
              },
              {
                label: 'BBB',
                value: 'ccc',
              },
            ])
          }
          else if (linkage === 2) {
            resolve([
              {
                label: 'CCC',
                value: 'ccc',
              },
              {
                label: 'DDD',
                value: 'ddd',
              },
            ])
          }
        }, 1500)
      })
    })
  },
})

export default function OfficialExample() {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Number
          name="linkage"
          title="联动选择框"
          x-decorator="FormItem"
          x-component="Select"
          enum={[
            { label: '发请求1', value: 1 },
            { label: '发请求2', value: 2 },
          ]}
          x-component-props={{
            style: {
              width: 120,
            },
          }}
        />
        <SchemaField.String
          name="select"
          title="异步选择框"
          x-decorator="FormItem"
          x-component="Select"
          x-component-props={{
            style: {
              width: 120,
            },
          }}
        />
      </SchemaField>
      <FormButtonGroup>
        <Submit onSubmitFailed={console.log} onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
