import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createDocsConfig } from '@silver-formily/docs-toolkit'
import pkg from '../../../packages/grid/package.json'

const currentDir = dirname(fileURLToPath(import.meta.url))
const demoDir = path.resolve(currentDir, '../demos')

export default createDocsConfig({
  pkg,
  demoDir,
  demoCodeFold: true,
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Silver Formily Grid',
      description: 'Grid 组件文档',
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Silver Formily Grid',
      description: 'Grid component docs',
    },
  },
  sidebar: {
    '/': [
      {
        text: '指南',
        items: [
          { text: '快速上手', link: '/' },
          { text: 'API 文档', link: '/api' },
        ],
      },
    ],
    '/en/': [
      {
        text: 'Guide',
        items: [
          { text: 'Quick Start', link: '/en/' },
          { text: 'API Reference', link: '/en/api' },
        ],
      },
    ],
  },
  footer: {
    message: 'Released under the MIT License.',
    blogroll: [
      {
        title: 'Silver Formily',
        children: [
          { text: 'Vue', link: 'https://vue.silver-formily.org/' },
          { text: 'Reactive Vue', link: 'https://reactive-vue.silver-formily.org/' },
          { text: 'Element Plus', link: 'https://element-plus.silver-formily.org/' },
        ],
      },
      {
        title: 'Rebuilt Formily Docs',
        children: [
          { text: 'JSON Schema', link: 'https://json-schema.silver-formily.org/' },
        ],
      },
    ],
  },
  socialLinks: [
    { icon: 'github', link: 'https://github.com/hezhengxu2018/silver-formily' },
  ],
  vite: {
    optimizeDeps: {
      include: ['@silver-formily/grid'],
    },
  },
  extra: {
    appearance: true,
  },
})
