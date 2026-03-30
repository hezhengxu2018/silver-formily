interface DemoPickerGroupItem {
  title: string
  options?: Array<{
    label?: string
    text?: string
    value?: string
  }>
}

type DemoPickerGroupDataSource = DemoPickerGroupItem[]

export const appointmentOptions: DemoPickerGroupDataSource = [
  {
    title: '城市',
    options: [
      { label: '杭州', value: 'hz' },
      { label: '上海', value: 'sh' },
      { label: '苏州', value: 'sz' },
    ],
  },
  {
    title: '时段',
    options: [
      { label: '上午', value: 'am' },
      { label: '下午', value: 'pm' },
      { text: '晚上', value: 'night' },
    ],
  },
]

export const scheduleTabs: DemoPickerGroupDataSource = [
  {
    title: '日期',
  },
  {
    title: '时间',
  },
]

export const deliveryTabs: DemoPickerGroupDataSource = [
  {
    title: '区域',
  },
  {
    title: '送达时间',
  },
]
