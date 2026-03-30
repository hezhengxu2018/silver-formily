import type { PickerFieldNames } from '@silver-formily/vant'

function cloneData<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

const cityOptionsSource = [
  { label: '杭州', value: 'hz' },
  { text: '宁波', value: 'nb' },
  { label: '苏州', name: 'sz' },
  { text: '上海', value: 'sh' },
]

const scheduleColumnsSource = [
  [
    { label: '杭州', value: 'hz' },
    { label: '上海', value: 'sh' },
    { label: '苏州', value: 'sz' },
  ],
  [
    { text: '上午', value: 'am' },
    { text: '下午', value: 'pm' },
    { text: '晚上', value: 'night' },
  ],
]

const regionColumnsSource = [
  {
    label: '浙江',
    value: 'zj',
    children: [
      { label: '杭州', value: 'hz' },
      { label: '宁波', value: 'nb' },
    ],
  },
  {
    text: '江苏',
    value: 'js',
    children: [
      { text: '南京', value: 'nj' },
      { text: '苏州', value: 'sz' },
    ],
  },
]

export const customFieldNames: PickerFieldNames = {
  text: 'labelText',
  value: 'code',
  children: 'nodes',
}

export const customFieldColumns = [
  {
    labelText: '出行',
    code: 'travel',
    nodes: [
      { labelText: '机票', code: 'flight' },
      { labelText: '高铁', code: 'train' },
    ],
  },
  {
    labelText: '住宿',
    code: 'hotel',
    nodes: [
      { labelText: '商务酒店', code: 'business' },
      { labelText: '民宿', code: 'bnb' },
    ],
  },
]

export const cityOptions = cloneData(cityOptionsSource)
export const scheduleColumns = cloneData(scheduleColumnsSource)
export const regionColumns = cloneData(regionColumnsSource)
