import type { TreeSelectItem } from '@silver-formily/vant'

export const categoryItems: TreeSelectItem[] = [
  {
    text: '浙江',
    children: [
      { text: '杭州', id: 'hangzhou' },
      { text: '宁波', id: 'ningbo' },
      { text: '温州', id: 'wenzhou', disabled: true },
    ],
  },
  {
    text: '江苏',
    badge: 2,
    children: [
      { text: '南京', id: 'nanjing' },
      { text: '苏州', id: 'suzhou' },
      { text: '无锡', id: 'wuxi' },
    ],
  },
  {
    text: '广东',
    dot: true,
    children: [
      { text: '广州', id: 'guangzhou' },
      { text: '深圳', id: 'shenzhen' },
      { text: '佛山', id: 'foshan' },
    ],
  },
]
