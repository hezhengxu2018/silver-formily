import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import pkg from '@silver-formily/antd/package.json' with { type: 'json' }
import { createDocsConfig } from '@silver-formily/docs-toolkit'

const currentDir = dirname(fileURLToPath(import.meta.url))
const names = [
  ['form', 'Form 表单'],
  ['form-item', 'FormItem 表单项'],
  ['form-layout', 'FormLayout 布局'],
  ['form-grid', 'FormGrid 网格布局'],
  ['form-button-group', 'FormButtonGroup 按钮组'],
  ['input', 'Input 输入框'],
  ['select', 'Select 选择器'],
  ['number-picker', 'NumberPicker 数值输入'],
  ['preview-text', 'PreviewText 阅读态'],
  ['submit', 'Submit 提交'],
  ['reset', 'Reset 重置'],
]
export default createDocsConfig({
  pkg,
  demoDir: path.resolve(currentDir, '../demos'),
  alias: { '@silver-formily/antd': `${path.resolve(currentDir, '../../../packages/antd/src')}/` },
  locales: { root: { label: '简体中文', lang: 'zh-CN' } },
  sidebar: {
    '/guide/': [{ text: '指南', items: [{ text: '介绍与迁移范围', link: '/guide/' }, { text: '快速开始', link: '/guide/quick-start' }, { text: '来源与示例适配', link: '/guide/sources' }] }],
    '/components/': [{ text: '组件', items: names.map(([name, text]) => ({ text, link: `/components/${name}` })) }],
  },
  themeConfig: {
    nav: [{ text: '指南', link: '/guide/' }, { text: '组件', link: '/components/form' }],
    outline: [2, 3],
  },
  socialLinks: [{ icon: 'github', link: 'https://github.com/hezhengxu2018/silver-formily' }],
  footer: { message: 'Released under the MIT License.' },
  vite: { esbuild: { jsx: 'automatic' } },
  extra: {
    title: 'Silver Formily Antd',
    description: '基于 Ant Design 6 的 React 表单组件',
  },
})
