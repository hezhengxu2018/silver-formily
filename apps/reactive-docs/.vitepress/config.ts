import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import pkg from '@formily/reactive/package.json' with { type: 'json' }
import { createDocsConfig } from '@silver-formily/docs-toolkit'

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
      title: 'Formily Reactive',
      description: '@formily/reactive 响应式文档',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/', activeMatch: '^/(guide/)?$|^/guide/' },
          { text: 'API', link: '/api/quick-start', activeMatch: '^/api/' },
        ],
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Formily Reactive',
      description: 'Documentation for @formily/reactive',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/', activeMatch: '^/en/(guide/)?$|^/en/guide/' },
          { text: 'API', link: '/en/api/quick-start', activeMatch: '^/en/api/' },
        ],
      },
    },
  },
  sidebar: {
    '/': [
      {
        text: 'Guide',
        items: [
          { text: '介绍', link: '/' },
        ],
      },
    ],
    '/api/': [
      {
        text: '快速开始',
        items: [
          { text: '快速开始', link: '/api/quick-start' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'observable', link: '/api/observable' },
          { text: 'define', link: '/api/define' },
          { text: 'model', link: '/api/model' },
          { text: 'autorun', link: '/api/autorun' },
          { text: 'reaction', link: '/api/reaction' },
          { text: 'tracker', link: '/api/tracker' },
          { text: 'batch', link: '/api/batch' },
          { text: 'action', link: '/api/action' },
          { text: 'untracked', link: '/api/untracked' },
          { text: 'observe', link: '/api/observe' },
          { text: 'toJS', link: '/api/to-js' },
          { text: 'raw', link: '/api/raw' },
          { text: 'markRaw', link: '/api/mark-raw' },
          { text: 'markObservable', link: '/api/mark-observable' },
        ],
      },
      {
        text: 'Utils',
        items: [
          { text: 'hasCollected', link: '/api/has-collected' },
          { text: 'typeChecker', link: '/api/type-checker' },
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
    ],
    '/en/api/': [
      {
        text: 'Quick Start',
        items: [
          { text: 'Quick Start', link: '/en/api/quick-start' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'observable', link: '/en/api/observable' },
          { text: 'define', link: '/en/api/define' },
          { text: 'model', link: '/en/api/model' },
          { text: 'autorun', link: '/en/api/autorun' },
          { text: 'reaction', link: '/en/api/reaction' },
          { text: 'tracker', link: '/en/api/tracker' },
          { text: 'batch', link: '/en/api/batch' },
          { text: 'action', link: '/en/api/action' },
          { text: 'untracked', link: '/en/api/untracked' },
          { text: 'observe', link: '/en/api/observe' },
          { text: 'toJS', link: '/en/api/to-js' },
          { text: 'raw', link: '/en/api/raw' },
          { text: 'markRaw', link: '/en/api/mark-raw' },
          { text: 'markObservable', link: '/en/api/mark-observable' },
        ],
      },
      {
        text: 'Utils',
        items: [
          { text: 'hasCollected', link: '/en/api/has-collected' },
          { text: 'typeChecker', link: '/en/api/type-checker' },
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
          { text: 'Reactive', link: 'https://reactive.formilyjs.org/' },
        ],
      },
      {
        title: 'Silver Formily',
        children: [
          { text: 'Vue', link: 'https://vue.silver-formily.org/' },
          { text: 'Reactive Vue', link: 'https://reactive-vue.silver-formily.org/' },
          { text: 'Element Plus', link: 'https://element-plus.silver-formily.org/' },
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
  vite: {
    optimizeDeps: {
      include: ['@formily/reactive'],
    },
  },
  extra: {
    appearance: true,
  },
})
