import type { Field, FormPathPattern } from '@silver-formily/core'
import { FormButtonGroup, FormItem, Select, Submit } from '@silver-formily/antd'
import {
  createForm,
  onFieldInit,
  onFieldReact,
} from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'
import { action, observable } from '@silver-formily/reactive'

let timeout: ReturnType<typeof setTimeout>
let currentValue: string
function fetchData(value: string, callback: (options: { label: string, value: string }[]) => void) {
  clearTimeout(timeout)
  currentValue = value
  timeout = setTimeout(() => {
    if (currentValue !== value)
      return
    callback(['杭州', '上海', '北京', '广州', '深圳', 'Formily', 'React'].filter(label => label.toLowerCase().includes(value.toLowerCase())).map(label => ({ label, value: label })))
  }, 300)
}

const SchemaField = createSchemaField({
  components: {
    Select,
    FormItem,
  },
})

function useAsyncDataSource(pattern: FormPathPattern, service: (param: {
  keyword: string
  field: Field
}) => Promise<{ label: string, value: any }[]>) {
  const keyword = observable.ref('')

  onFieldInit(pattern, (field) => {
    field.setComponentProps({
      onSearch: (value) => {
        keyword.value = value
      },
    })
  })

  onFieldReact(pattern, (field: Field) => {
    field.loading = true
    service({ field, keyword: keyword.value }).then(
      action.bound((data) => {
        field.dataSource = data
        field.loading = false
      }),
    )
  })
}

const form = createForm({
  effects: () => {
    useAsyncDataSource('select', async ({ keyword }) => {
      if (!keyword) {
        return []
      }
      return new Promise<{ label: string, value: any }[]>((resolve) => {
        fetchData(keyword, resolve)
      })
    })
  },
})

export default function OfficialExample() {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String
          name="select"
          title="异步搜索选择框"
          x-decorator="FormItem"
          x-component="Select"
          x-component-props={{
            showSearch: true,
            filterOption: false,
            style: {
              width: 300,
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
