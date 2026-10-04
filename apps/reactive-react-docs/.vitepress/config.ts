import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createDocsConfig } from '@silver-formily/docs-toolkit'
import pkg from '@silver-formily/reactive-react/package.json' with { type: 'json' }

const currentDir = dirname(fileURLToPath(import.meta.url))
const demoDir = path.resolve(currentDir, '../demos')
const reactiveReactSource = `${path.resolve(currentDir, '../../../packages/reactive-react/src')}/`

export default createDocsConfig({
  pkg,
  demoDir,
  alias: {
    '@silver-formily/reactive-react': reactiveReactSource,
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Silver Formily Reactive React',
      description: 'React 的 @formily/reactive-react 封装',
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Silver Formily Reactive React',
      description: 'React wrapper for @formily/reactive',
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
  },
  socialLinks: [
    { icon: 'github', link: 'https://github.com/hezhengxu2018/silver-formily' },
  ],
  vite: {
    esbuild: {
      jsx: 'automatic',
    },
  },
  extra: {
    appearance: true,
  },
})
