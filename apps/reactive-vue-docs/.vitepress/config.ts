import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createDocsConfig } from '@silver-formily/docs-toolkit'
import pkg from '../../../packages/reactive-vue/package.json'

const currentDir = dirname(fileURLToPath(import.meta.url))
const demoDir = path.resolve(currentDir, '../demos')

export default createDocsConfig({
  pkg,
  demoDir,
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Silver Formily Reactive Vue',
      description: 'Vue3 的 @formily/reactive-vue 封装',
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Silver Formily Reactive Vue',
      description: 'Vue 3 wrapper for @formily/reactive',
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
        title: 'Formily',
        children: [
          { text: 'Reactive', link: 'https://reactive.formilyjs.org/' },
        ],
      },
      {
        title: 'Silver Formily',
        children: [
          { text: 'Element Plus', link: 'https://element-plus.silver-formily.org/' },
          { text: 'Vue', link: 'https://vue.silver-formily.org/' },
        ],
      },
    ],
  },
  socialLinks: [
    { icon: 'github', link: 'https://github.com/hezhengxu2018/silver-formily' },
  ],
  vite: {
    optimizeDeps: {
      include: ['@formily/core', '@silver-formily/reactive-vue', '@formily/reactive', 'element-plus', 'dayjs'],
    },
  },
  extra: {
    appearance: true,
  },
})
