export const featureOptions = [
  {
    label: '拍照上传',
    value: 'photo',
  },
  {
    label: '定位签到',
    value: 'location',
  },
  {
    label: '离线暂存',
    value: 'offline',
  },
]

export const channelOptions = [
  {
    label: '短信提醒',
    value: 'sms',
  },
  {
    label: '邮件提醒',
    value: 'email',
  },
  {
    label: '站内消息',
    value: 'site',
  },
  {
    label: '企业微信',
    value: 'wecom',
  },
]

export const serviceOptions = [
  {
    label: '上门安装',
    value: 'install',
    description: '适合需要预约时间、安排工程师到场服务的订单。',
    tag: '最常用',
  },
  {
    label: '加急处理',
    value: 'express',
    description: '适合对交付时效要求比较高的紧急流程。',
    tag: '时效优先',
  },
  {
    label: '现场培训',
    value: 'training',
    description: '适合需要在交付后同步讲解操作方式的项目。',
    tag: '服务增强',
  },
]
