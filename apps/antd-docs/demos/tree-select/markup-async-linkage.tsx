import type { Field as FieldType } from '@silver-formily/core'
import {
  FormButtonGroup,
  FormItem,
  Select,
  Submit,
  TreeSelect,
} from '@silver-formily/antd'
import { createForm, onFieldReact } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'
import { action } from '@silver-formily/reactive'

interface TreeOption {
  label?: string
  title?: string
  value: string
  key?: string
  children?: TreeOption[]
}

const requests = new WeakMap<FieldType, number>()

function updateDataSource(field: FieldType, service: (field: FieldType) => Promise<TreeOption[]>) {
  const request = (requests.get(field) ?? 0) + 1
  requests.set(field, request)
  // 在 reaction 中同步读取联动字段，以追踪依赖。
  const pending = service(field)
  action(() => {
    field.value = undefined
    field.dataSource = []
    field.loading = true
    field.setSelfErrors([])
  })
  pending.then(action.bound((data) => {
    if (requests.get(field) !== request)
      return
    field.dataSource = data
    field.loading = false
  }), action.bound(() => {
    if (requests.get(field) !== request)
      return
    field.loading = false
    field.setSelfErrors(['数据加载失败，请重新选择联动选项'])
  }))
}

const SchemaField = createSchemaField({
  components: {
    Select,
    TreeSelect,
    FormItem,
  },
})

function useAsyncDataSource(pattern: string, service: (field: FieldType) => Promise<TreeOption[]>) {
  onFieldReact(pattern, (field: FieldType) => updateDataSource(field, service))
}

const form = createForm({
  effects: () => {
    useAsyncDataSource('select', async (field) => {
      const linkage = field.query('linkage').get('value')
      if (linkage !== 1 && linkage !== 2)
        return []
      return new Promise<TreeOption[]>((resolve) => {
        setTimeout(() => {
          if (linkage === 1) {
            resolve([
              {
                label: 'AAA',
                value: 'aaa',
                children: [
                  {
                    title: 'Child Node1',
                    value: '0-0-0',
                    key: '0-0-0',
                  },
                  {
                    title: 'Child Node2',
                    value: '0-0-1',
                    key: '0-0-1',
                  },
                  {
                    title: 'Child Node3',
                    value: '0-0-2',
                    key: '0-0-2',
                  },
                ],
              },
              {
                label: 'BBB',
                value: 'bbb',
                children: [
                  {
                    title: 'Child Node1',
                    value: '0-1-0',
                    key: '0-1-0',
                  },
                  {
                    title: 'Child Node2',
                    value: '0-1-1',
                    key: '0-1-1',
                  },
                  {
                    title: 'Child Node3',
                    value: '0-1-2',
                    key: '0-1-2',
                  },
                ],
              },
            ])
          }
          else if (linkage === 2) {
            resolve([
              {
                label: 'CCC',
                value: 'ccc',
                children: [
                  {
                    title: 'Child Node1',
                    value: '1-0-0',
                    key: '1-0-0',
                  },
                  {
                    title: 'Child Node2',
                    value: '1-0-1',
                    key: '1-0-1',
                  },
                  {
                    title: 'Child Node3',
                    value: '1-0-2',
                    key: '1-0-2',
                  },
                ],
              },
              {
                label: 'DDD',
                value: 'ddd',
                children: [
                  {
                    title: 'Child Node1',
                    value: '1-1-0',
                    key: '1-1-0',
                  },
                  {
                    title: 'Child Node2',
                    value: '1-1-1',
                    key: '1-1-1',
                  },
                  {
                    title: 'Child Node3',
                    value: '1-1-2',
                    key: '1-1-2',
                  },
                ],
              },
            ])
          }
        }, 1500)
      })
    })
  },
})

export default function Demo() {
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
              width: 200,
            },
          }}
        />
        <SchemaField.String
          name="select"
          title="异步选择框"
          x-decorator="FormItem"
          x-component="TreeSelect"
          x-component-props={{
            style: {
              width: 200,
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
