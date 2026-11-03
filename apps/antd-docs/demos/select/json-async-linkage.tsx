import { FormButtonGroup, FormItem, Select, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'
import { action } from '@silver-formily/reactive'
import React from 'react'
// Adapted from Alibaba Formily (MIT); see /guide/sources for source and license.
import { DemoConfig } from '../_shared'

const SchemaField = createSchemaField({
  components: {
    Select,
    FormItem,
  },
})

async function loadData(field) {
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
}

function useAsyncDataSource(service) {
  return (field) => {
    field.loading = true
    service(field).then(
      action.bound((data) => {
        field.dataSource = data
        field.loading = false
      }),
    )
  }
}

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    linkage: {
      'type': 'string',
      'title': '联动选择框',
      'enum': [
        { label: '发请求1', value: 1 },
        { label: '发请求2', value: 2 },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        style: {
          width: 120,
        },
      },
    },
    select: {
      'type': 'string',
      'title': '异步选择框',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        style: {
          width: 120,
        },
      },
      'x-reactions': ['{{useAsyncDataSource(loadData)}}'],
    },
  },
}

function OfficialExample() {
  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} scope={{ useAsyncDataSource, loadData }} />
      <FormButtonGroup>
        <Submit onSubmitFailed={console.log} onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}

export default function Demo() {
  return <DemoConfig><OfficialExample /></DemoConfig>
}
