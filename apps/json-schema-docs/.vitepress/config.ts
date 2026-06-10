import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createDocsConfig } from '@silver-formily/docs-toolkit'
import pkg from '@silver-formily/json-schema/package.json' with { type: 'json' }

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
      title: 'Silver Formily JSON Schema',
      description: '@silver-formily/json-schema 文档',
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Silver Formily JSON Schema',
      description: 'Documentation for @silver-formily/json-schema',
    },
  },
  sidebar: {
    '/': [
      {
        text: '指南',
        items: [
          { text: '快速上手', link: '/' },
        ],
      },
      {
        text: 'Schema API',
        items: [
          { text: '构造器', link: '/api/constructor' },
          { text: '属性与字段模型映射', link: '/api/properties' },
          { text: '方法', link: '/api/methods' },
          { text: '静态方法', link: '/api/static-methods' },
          { text: '类型', link: '/api/types' },
          { text: '联动示例', link: '/api/linkages' },
        ],
      },
    ],
    '/en/': [
      {
        text: 'Guide',
        items: [
          { text: 'Quick Start', link: '/en/' },
        ],
      },
      {
        text: 'Schema API',
        items: [
          { text: 'Constructor', link: '/en/api/constructor' },
          { text: 'Properties & Field Mapping', link: '/en/api/properties' },
          { text: 'Methods', link: '/en/api/methods' },
          { text: 'Static Methods', link: '/en/api/static-methods' },
          { text: 'Types', link: '/en/api/types' },
          { text: 'Linkage Examples', link: '/en/api/linkages' },
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
    optimizeDeps: {
      include: [
        'vue',
      ],
    },
  },
  extra: {
    appearance: true,
  },
})
