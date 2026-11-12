import type { Field as FieldType, FormPathPattern } from '@silver-formily/core'
import { FormButtonGroup, FormItem, Select, Submit } from '@silver-formily/antd'
import {
  createForm,
  onFieldReact,
} from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { action } from '@silver-formily/reactive'

function useAsyncDataSource(pattern: FormPathPattern, service: (field: FieldType) => Promise<{ label: string, value: any }[]>) {
  onFieldReact(pattern, (field: FieldType) => {
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
      <Field
        name="linkage"
        title="联动选择框"
        dataSource={[
          { label: '发请求1', value: 1 },
          { label: '发请求2', value: 2 },
        ]}
        decorator={[FormItem]}
        component={[
          Select,
          {
            style: {
              width: 120,
            },
          },
        ]}
      />
      <Field
        name="select"
        title="异步选择框"
        decorator={[FormItem]}
        component={[
          Select,
          {
            style: {
              width: 120,
            },
          },
        ]}
      />
      <FormButtonGroup>
        <Submit onSubmitFailed={console.log} onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
