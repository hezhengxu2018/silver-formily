import type { Field as FieldType } from '@silver-formily/core'
import { Cascader, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd'
import { createForm, onFieldReact } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { action } from '@silver-formily/reactive'

interface AddressData {
  [code: string]: string | {
    name: string
    code: string
    cities?: AddressData
    districts?: AddressData
  }
}

interface Option {
  label: string
  value: string
  children?: Option[]
}

function transformAddress(data: AddressData = {}): Option[] {
  return Object.entries(data).map(([key, value]) => {
    if (typeof value === 'string')
      return { label: value, value: key }
    const cities = transformAddress(value.cities)
    const districts = transformAddress(value.districts)
    const children = cities.length ? cities : districts
    return {
      label: value.name,
      value: value.code,
      children: children.length ? children : undefined,
    }
  })
}

async function fetchAddress(): Promise<AddressData> {
  // 模拟地址接口，实际使用时替换为业务请求。
  await new Promise(resolve => setTimeout(resolve, 600))
  return {
    330000: {
      name: '浙江省',
      code: '330000',
      cities: {
        330100: { name: '杭州市', code: '330100', districts: { 330106: '西湖区', 330108: '滨江区' } },
      },
    },
    320000: {
      name: '江苏省',
      code: '320000',
      cities: {
        320100: { name: '南京市', code: '320100', districts: { 320102: '玄武区', 320104: '秦淮区' } },
      },
    },
  }
}

function loadAddress(field: FieldType) {
  field.loading = true
  fetchAddress().then(action.bound((data) => {
    field.dataSource = transformAddress(data)
    field.loading = false
  }), action.bound(() => {
    field.loading = false
    field.setSelfErrors(['地址加载失败，请刷新重试'])
  }))
}

const form = createForm({ effects: () => onFieldReact('address', loadAddress) })

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field name="address" title="地址选择" decorator={[FormItem]} component={[Cascader, { style: { width: 280 } }]} />
      <FormButtonGroup>
        <Submit onSubmitFailed={console.log} onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
