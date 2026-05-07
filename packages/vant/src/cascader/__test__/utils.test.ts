import type { CascaderFieldNames, CascaderOption } from '../types'
import { describe, expect, it } from 'vitest'
import {
  findCascaderPathByLeafValue,
  findCascaderPathByValues,
  formatCascaderValue,
  getCascaderLeafValue,
  mapSelectedOptionsToValues,
  normalizeCascaderValue,
  resolveCascaderSelectedOptions,
} from '../utils'

const options: CascaderOption[] = [
  {
    text: '浙江',
    value: 'zj',
    children: [
      {
        text: '杭州',
        value: 'hz',
        children: [
          {
            text: '西湖区',
            value: 'xh',
          },
        ],
      },
    ],
  },
  {
    text: '江苏',
    value: 'js',
    children: [
      {
        text: '南京',
        value: 'nj',
      },
    ],
  },
  {
    text: '异常节点',
    value: 'broken',
    children: 'invalid-children' as any,
  },
]

const aliasFieldNames: CascaderFieldNames = {
  text: 'label',
  value: 'code',
  children: 'items',
}

const aliasOptions: CascaderOption[] = [
  {
    label: '浙江',
    code: 'zj',
    items: [
      {
        label: '杭州',
        code: 'hz',
        items: [
          {
            label: '西湖区',
            code: 'xh',
          },
        ],
      },
    ],
  },
]

describe('cascader utils', () => {
  it('应该把选中项映射为值并过滤非法值', () => {
    expect(mapSelectedOptionsToValues([
      { text: '浙江', value: 'zj' },
      { text: '非法', value: true as any },
      { text: '杭州', value: 'hz' },
    ])).toEqual(['zj', 'hz'])

    expect(mapSelectedOptionsToValues([
      { text: '非法', value: {} as any },
    ])).toBeNull()
  })

  it('应该按叶子值回溯路径，并支持自定义字段名', () => {
    expect(findCascaderPathByLeafValue(options, 'xh')?.map(item => item.value)).toEqual(['zj', 'hz', 'xh'])
    expect(findCascaderPathByLeafValue(options, 'missing')).toBeNull()

    expect(findCascaderPathByLeafValue(aliasOptions, 'xh', aliasFieldNames)?.map(item => item.code)).toEqual(['zj', 'hz', 'xh'])
  })

  it('应该按路径值查找节点，并在空路径或断裂路径时返回 null', () => {
    expect(findCascaderPathByValues(options, ['zj', 'hz', 'xh'])?.map(item => item.value)).toEqual(['zj', 'hz', 'xh'])
    expect(findCascaderPathByValues(options, [])).toBeNull()
    expect(findCascaderPathByValues(options, ['zj', 'xh'])).toBeNull()
    expect(findCascaderPathByValues(options, ['broken', 'child'])).toBeNull()
  })

  it('应该归一化单值、数组值和无效值', () => {
    expect(normalizeCascaderValue(['zj', 'hz', 'xh'], options)).toEqual(['zj', 'hz', 'xh'])
    expect(normalizeCascaderValue(['zj', null, 'xh'] as any, options)).toEqual(['zj', 'xh'])
    expect(normalizeCascaderValue(['unknown', 'path'], options)).toEqual(['unknown', 'path'])

    expect(normalizeCascaderValue('xh', options)).toEqual(['zj', 'hz', 'xh'])
    expect(normalizeCascaderValue('unknown', options)).toEqual(['unknown'])

    expect(normalizeCascaderValue(undefined, options)).toBeNull()
    expect(normalizeCascaderValue({} as any, options)).toBeNull()
  })

  it('应该优先解析完整路径，失败时退回到叶子节点查找', () => {
    expect(resolveCascaderSelectedOptions(['zj', 'hz', 'xh'], options).map(item => item.value)).toEqual(['zj', 'hz', 'xh'])
    expect(resolveCascaderSelectedOptions(['zj', 'xh'], options).map(item => item.value)).toEqual(['zj', 'hz', 'xh'])
    expect(resolveCascaderSelectedOptions(null, options)).toEqual([])
    expect(resolveCascaderSelectedOptions(['zj', true as any] as any, options)).toEqual([])
  })

  it('应该格式化选中值，并在文本缺失时回退到 value 或空字符串', () => {
    expect(formatCascaderValue(null, [])).toBe('')

    expect(formatCascaderValue(['zj', 'hz'], [
      { text: '浙江', value: 'zj' },
      { value: 'hz' },
    ])).toBe('浙江 / hz')

    expect(formatCascaderValue(['zj'], [
      { text: null as any, value: null as any },
    ])).toBe('')

    expect(formatCascaderValue(['zj', 'hz'], [])).toBe('zj / hz')
    expect(formatCascaderValue(['zj', 'hz'], [], undefined, ' > ')).toBe('zj > hz')
  })

  it('应该返回归一化后的叶子值', () => {
    expect(getCascaderLeafValue('xh', options)).toBe('xh')
    expect(getCascaderLeafValue(['zj', 'hz', 'xh'], options)).toBe('xh')
    expect(getCascaderLeafValue(undefined, options)).toBeUndefined()
  })

  it('应该在省略 options 时走默认参数和空结果兜底', () => {
    expect(normalizeCascaderValue('standalone')).toEqual(['standalone'])
    expect(resolveCascaderSelectedOptions(['missing'])).toEqual([])
    expect(getCascaderLeafValue('standalone')).toBe('standalone')
    expect(resolveCascaderSelectedOptions(['unknown'], options)).toEqual([])
  })
})
