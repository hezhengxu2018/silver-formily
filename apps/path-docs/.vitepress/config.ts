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
          { text: '文档', link: '/', activeMatch: '^/$|^/guide/|^/api/' },
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
          { text: 'Docs', link: '/en/', activeMatch: '^/en/$|^/en/guide/|^/en/api/' },
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
          { text: '快速开始', link: '/guide/quick-start' },
          { text: '模式语法', link: '/guide/patterns' },
          { text: '匹配能力', link: '/guide/matching' },
          { text: '访问器', link: '/guide/accessors' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'Path API', link: '/api/path-class' },
        ],
      },
    ],
    '/en/': [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/en/' },
          { text: 'Quick Start', link: '/en/guide/quick-start' },
          { text: 'Pattern Syntax', link: '/en/guide/patterns' },
          { text: 'Matching', link: '/en/guide/matching' },
          { text: 'Accessors', link: '/en/guide/accessors' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'Path API', link: '/en/api/path-class' },
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
          { text: 'Reactive', link: 'https://reactive.silver-formily.org/' },
          { text: 'Vue', link: 'https://vue.silver-formily.org/' },
          { text: 'Reactive Vue', link: 'https://reactive-vue.silver-formily.org/' },
          { text: 'Grid', link: 'https://grid.silver-formily.org/' },
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
  themeConfig: {
    logo: '/logo.svg',
    outline: [2, 4],
  },
  vite: {
    optimizeDeps: {
      include: ['@silver-formily/path'],
    },
  },
  extra: {
    appearance: true,
  },
})
