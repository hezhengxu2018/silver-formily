import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createDocsConfig } from '@silver-formily/docs-toolkit'
import pkg from '@silver-formily/react/package.json' with { type: 'json' }
import { enLocale, enSidebar } from './i18n/en'
import { zhLocale, zhSidebar } from './i18n/zh'

const currentDir = dirname(fileURLToPath(import.meta.url))
const demoDir = path.resolve(currentDir, '../demos')
const reactSource = `${path.resolve(currentDir, '../../../packages/react/src')}/`

const sidebar = {
  ...zhSidebar,
  ...enSidebar,
}

export default createDocsConfig({
  pkg,
  demoDir,
  alias: {
    '@silver-formily/react': reactSource,
  },
  locales: {
    root: zhLocale,
    en: enLocale,
  },
  sidebar,
  head: [
    ['meta', { name: 'description', content: 'Formily 的 React 表单运行时与使用指南' }],
    ['meta', { name: 'keywords', content: 'Formily, React, 表单' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Silver Formily React' }],
    ['meta', { property: 'og:title', content: 'Silver Formily React' }],
    ['meta', { property: 'og:description', content: 'Formily React 组件库文档、示例与最佳实践' }],
  ],
  footer: {
    message: 'Released under the MIT License.',
  },
  socialLinks: [
    { icon: 'github', link: 'https://github.com/hezhengxu2018/silver-formily' },
  ],
  vite: {
    esbuild: {
      jsx: 'automatic',
    },
  },
  themeConfig: {
    aside: true,
    outline: [2, 4],
  },
  extra: {
    title: 'Silver Formily React',
    description: 'React 18/19 wrapper for Formily',
  },
})
