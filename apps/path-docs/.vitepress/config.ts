import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createDocsConfig } from '@silver-formily/docs-toolkit'
import pkg from '@silver-formily/path/package.json' with { type: 'json' }

const currentDir = dirname(fileURLToPath(import.meta.url))
const demoDir = path.resolve(currentDir, '../demos')
const pathSource = `${path.resolve(currentDir, '../../../packages/path/src')}/`

export default createDocsConfig({
  pkg,
  demoDir,
  demoCodeFold: true,
  alias: {
    '@silver-formily/path': pathSource,
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Silver Formily Path',
      description: 'Path 语法、匹配规则与访问器 API 文档',
      themeConfig: {
        nav: [
          { text: '文档', link: '/', activeMatch: '^/$|^/api/' },
        ],
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Silver Formily Path',
      description: 'Path syntax, matcher rules, and accessor APIs',
      themeConfig: {
        nav: [
          { text: 'Docs', link: '/en/', activeMatch: '^/en/$|^/en/api/' },
        ],
      },
    },
  },
  sidebar: {
    '/': [
      {
        text: '指南',
        items: [
          { text: '介绍', link: '/' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: '快速开始', link: '/api/quick-start' },
          { text: '访问器', link: '/api/accessors' },
          { text: '模式语法', link: '/api/patterns' },
          { text: '匹配能力', link: '/api/matching' },
          { text: 'Path 实例方法', link: '/api/path-class' },
        ],
      },
    ],
    '/en/': [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/en/' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'Quick Start', link: '/en/api/quick-start' },
          { text: 'Accessors', link: '/en/api/accessors' },
          { text: 'Pattern Syntax', link: '/en/api/patterns' },
          { text: 'Matching', link: '/en/api/matching' },
          { text: 'Path Instance Methods', link: '/en/api/path-class' },
        ],
      },
    ],
  },
  footer: {
    message: 'Released under the MIT License.',
    blogroll: [
      {
        title: 'Formily',
        children: [
          { text: 'FormPath 官方页面', link: 'https://core.formilyjs.org/zh-CN/api/entry/form-path' },
        ],
      },
      {
        title: 'Silver Formily',
        children: [
          { text: 'Vue', link: 'https://vue.silver-formily.org/' },
          { text: 'Reactive Vue', link: 'https://reactive-vue.silver-formily.org/' },
          { text: 'Grid', link: 'https://grid.silver-formily.org/' },
        ],
      },
      {
        title: 'Rebuilt Formily Docs',
        children: [
          { text: 'Reactive', link: 'https://reactive.silver-formily.org/' },
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
      include: ['@silver-formily/path'],
    },
  },
  extra: {
    appearance: true,
  },
})
