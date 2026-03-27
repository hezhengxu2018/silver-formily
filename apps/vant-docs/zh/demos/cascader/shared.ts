import type { CascaderOption } from '@silver-formily/vant'

export const cityOptions: CascaderOption[] = [
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
          {
            text: '余杭区',
            value: 'yh',
          },
        ],
      },
      {
        text: '宁波',
        value: 'nb',
        children: [
          {
            text: '鄞州区',
            value: 'yz',
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
        children: [
          {
            text: '鼓楼区',
            value: 'gl',
          },
        ],
      },
    ],
  },
]
