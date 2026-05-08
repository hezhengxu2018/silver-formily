import type { CascaderFieldNames, CascaderOption } from '@silver-formily/vant'

function cloneOptions<T>(options: T): T {
  return JSON.parse(JSON.stringify(options)) as T
}

const regionOptionsSource: CascaderOption[] = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          {
            text: '西湖区',
            value: '330106',
          },
          {
            text: '余杭区',
            value: '330110',
          },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          {
            text: '鄞州区',
            value: '330212',
          },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          {
            text: '鼓楼区',
            value: '320106',
          },
        ],
      },
    ],
  },
]

export const fieldNames: CascaderFieldNames = {
  text: 'name',
  value: 'code',
  children: 'items',
}

export const customFieldOptions = [
  {
    name: '浙江省',
    code: '330000',
    items: [
      {
        name: '杭州市',
        code: '330100',
      },
    ],
  },
  {
    name: '江苏省',
    code: '320000',
    items: [
      {
        name: '南京市',
        code: '320100',
      },
    ],
  },
]

export const cityOptions = cloneOptions(regionOptionsSource)
