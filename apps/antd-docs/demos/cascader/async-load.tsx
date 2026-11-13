import type { Field as FieldType, FormPathPattern } from '@silver-formily/core'
import type { CascaderProps } from 'antd'
import { Cascader, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd'
import { createForm, onFieldInit } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { action } from '@silver-formily/reactive'

interface Option {
  label: string
  value: string
  isLeaf?: boolean
  loading?: boolean
  children?: Option[]
}

const initialOptions: Option[] = [
  { label: '浙江省', value: '330000', isLeaf: false },
  { label: '江苏省', value: '320000', isLeaf: false },
]

async function fetchChildren(value: string): Promise<Option[]> {
  await new Promise(resolve => setTimeout(resolve, 800))
  const children: Record<string, Option[]> = {
    330000: [{ label: '杭州市', value: '330100', isLeaf: false }],
    320000: [{ label: '南京市', value: '320100', isLeaf: false }],
    330100: [{ label: '西湖区', value: '330106', isLeaf: true }, { label: '滨江区', value: '330108', isLeaf: true }],
    320100: [{ label: '玄武区', value: '320102', isLeaf: true }, { label: '秦淮区', value: '320104', isLeaf: true }],
  }
  return children[value] ?? []
}

function updateOptions(options: Option[], value: string, patch: Partial<Option>): Option[] {
  return options.map(option => option.value === value
    ? { ...option, ...patch }
    : { ...option, children: option.children && updateOptions(option.children, value, patch) })
}

function useAsyncDataSource(pattern: FormPathPattern, service: (params: {
  field: FieldType
  selectedOptions: Option[]
}) => Promise<Option[]>) {
  onFieldInit(pattern, (field: FieldType) => {
    const pending = new Set<string>()
    const loadData: CascaderProps<Option>['loadData'] = async (selectedOptions) => {
      const target = selectedOptions[selectedOptions.length - 1]
      if (!target || target.children?.length || pending.has(target.value))
        return
      pending.add(target.value)
      const update = action.bound((patch: Partial<Option>) => {
        field.dataSource = updateOptions(field.dataSource as Option[], target.value, patch)
      })
      update({ loading: true })
      field.setSelfErrors([])
      try {
        const children = await service({ field, selectedOptions })
        update({ children, isLeaf: children.length === 0 })
      }
      catch {
        field.setSelfErrors(['加载失败，请重新展开选项重试'])
      }
      finally {
        update({ loading: false })
        pending.delete(target.value)
      }
    }
    field.setComponentProps({ loadData })
  })
}

const form = createForm({
  effects: () => {
    useAsyncDataSource('address', ({ selectedOptions }) => {
      const target = selectedOptions[selectedOptions.length - 1]
      return fetchChildren(target.value)
    })
  },
})

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field
        name="address"
        title="异步地址选择"
        required
        dataSource={initialOptions}
        decorator={[FormItem]}
        component={[Cascader, {
          showSearch: false,
          placeholder: '选择省、市、区',
          style: { width: 280 },
        }]}
      />
      <FormButtonGroup>
        <Submit onSubmitFailed={console.log} onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
