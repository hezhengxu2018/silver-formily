import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import pkg from '@silver-formily/antd/package.json' with { type: 'json' }
import { createDocsConfig } from '@silver-formily/docs-toolkit'

const currentDir = dirname(fileURLToPath(import.meta.url))
const componentSidebar = [
  {
    text: 'Overview 总览',
    items: [{ text: 'Quick Start 快速开始', link: '/guide/quick-start' }],
  },
  {
    text: 'Layout 布局组件',
    items: [
      { text: 'Form 表单', link: '/components/form' },
      { text: 'FormItem 表单项', link: '/components/form-item' },
      { text: 'FormLayout 布局', link: '/components/form-layout' },
      { text: 'FormGrid 网格布局', link: '/components/form-grid' },
      { text: 'FormButtonGroup 按钮组', link: '/components/form-button-group' },
      { text: 'Submit 提交', link: '/components/submit' },
      { text: 'Reset 重置', link: '/components/reset' },
    ],
  },
  {
    text: 'Input 输入组件',
    items: [
      { text: 'Input 输入框', link: '/components/input' },
      { text: 'InputNumber 数值输入', link: '/components/input-number' },
      { text: 'AutoComplete 自动完成', link: '/components/auto-complete' },
      { text: 'Mentions 提及', link: '/components/mentions' },
      { text: 'OTP 一次性密码输入', link: '/components/otp' },
      { text: 'Password 密码输入', link: '/components/password' },
      { text: 'Checkbox 复选框', link: '/components/checkbox' },
      { text: 'Radio 单选框', link: '/components/radio' },
      { text: 'Select 选择器', link: '/components/select' },
      { text: 'TreeSelect 树选择', link: '/components/tree-select' },
      { text: 'Cascader 级联选择', link: '/components/cascader' },
      { text: 'Transfer 穿梭框', link: '/components/transfer' },
      { text: 'Switch 开关', link: '/components/switch' },
      { text: 'Rate 评分', link: '/components/rate' },
      { text: 'Slider 滑块', link: '/components/slider' },
      { text: 'DatePicker 日期选择', link: '/components/date-picker' },
      { text: 'TimePicker 时间选择', link: '/components/time-picker' },
      { text: 'Upload 上传', link: '/components/upload' },
    ],
  },
  {
    text: 'Scenario 场景组件',
    items: [],
  },
  {
    text: 'Read Pretty 阅读态组件',
    items: [
      { text: 'PreviewText 阅读态', link: '/components/preview-text' },
    ],
  },
]
export default createDocsConfig({
  pkg,
  demoDir: path.resolve(currentDir, '../demos'),
  alias: { '@silver-formily/antd': `${path.resolve(currentDir, '../../../packages/antd/src')}/` },
  locales: { root: { label: '简体中文', lang: 'zh-CN' } },
  sidebar: {
    '/guide/': [{ text: '指南', items: [{ text: '介绍与迁移范围', link: '/guide/' }, { text: '快速开始', link: '/guide/quick-start' }, { text: '来源与示例适配', link: '/guide/sources' }] }],
    '/components/': componentSidebar,
  },
  themeConfig: {
    nav: [{ text: '指南', link: '/guide/' }, { text: '组件', link: '/components/form' }],
    outline: [2, 3],
  },
  socialLinks: [{ icon: 'github', link: 'https://github.com/hezhengxu2018/silver-formily' }],
  footer: { message: 'Released under the MIT License.' },
  vite: {
    esbuild: { jsx: 'automatic' },
    ssr: { noExternal: ['antd', /^@ant-design\//, /^@rc-component\//] },
    optimizeDeps: {
      include: ['antd/es/config-provider/hooks/useCSSVarCls', 'antd/es/form/context', 'antd/es/form/style'],
    },
  },
  extra: {
    title: 'Silver Formily Antd',
    description: '基于 Ant Design 6 的 React 表单组件',
  },
})
