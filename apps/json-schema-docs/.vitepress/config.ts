import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import pkg from '@formily/json-schema/package.json' with { type: 'json' }
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
      title: 'Formily JSON Schema',
      description: '@formily/json-schema 文档',
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Formily JSON Schema',
      description: 'Documentation for @formily/json-schema',
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
    blogroll: [
      {
        title: 'Formily',
        children: [
          { text: 'Core', link: 'https://core.formilyjs.org/' },
          { text: 'Vue', link: 'https://vue.formilyjs.org/' },
          { text: 'React', link: 'https://react.formilyjs.org/' },
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
          { text: 'Reactive', link: 'https://reactive.silver-formily.org/' },
        ],
      },
    ],
  },
  socialLinks: [
    { icon: 'github', link: 'https://github.com/hezhengxu2018/silver-formily' },
  ],
  vite: {
    optimizeDeps: {
      include: [
        '@formily/core',
        '@formily/reactive',
        '@formily/shared',
        '@formily/json-schema',
        '@silver-formily/reactive-vue',
        '@silver-formily/vue',
        'vue',
      ],
    },
  },
  extra: {
    appearance: true,
  },
})
