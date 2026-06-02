import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import pkg from '@silver-formily/core/package.json' with { type: 'json' }
import { createDocsConfig } from '@silver-formily/docs-toolkit'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default createDocsConfig({
  pkg,
  alias: {
    '@silver-formily/core': `${path.resolve(currentDir, '../../../packages/core/src')}/`,
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Silver Formily Core',
      description: '@silver-formily/core 核心文档',
      themeConfig: {
        nav: [
          { text: '指南', link: '/guide/', activeMatch: '^/guide/' },
          { text: 'API', link: '/api/entry/createForm', activeMatch: '^/api/' },
        ],
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Silver Formily Core',
      description: 'Documentation for @silver-formily/core',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/guide/', activeMatch: '^/en/guide/' },
          { text: 'API', link: '/en/api/entry/createForm', activeMatch: '^/en/api/' },
        ],
      },
    },
  },
  sidebar: {
    '/guide/': [
      {
        text: '指南',
        items: [
          { text: '介绍', link: '/guide/' },
          { text: '架构设计', link: '/guide/architecture' },
          { text: 'MVVM 模式', link: '/guide/mvvm' },
          { text: '表单 (Form)', link: '/guide/form' },
          { text: '字段 (Field)', link: '/guide/field' },
          { text: '值与状态', link: '/guide/values' },
        ],
      },
    ],
    '/api/': [
      {
        text: '入口 API',
        items: [
          { text: 'createForm', link: '/api/entry/createForm' },
          { text: 'FormPath', link: '/api/entry/FormPath' },
          { text: 'FormChecker', link: '/api/entry/FormChecker' },
          { text: 'FormEffectHooks', link: '/api/entry/FormEffectHooks' },
          { text: 'FieldEffectHooks', link: '/api/entry/FieldEffectHooks' },
          { text: 'FormHooksAPI', link: '/api/entry/FormHooksAPI' },
          { text: 'FormValidatorRegistry', link: '/api/entry/FormValidatorRegistry' },
        ],
      },
      {
        text: '模型',
        items: [
          { text: 'Form', link: '/api/models/Form' },
          { text: 'Field', link: '/api/models/Field' },
          { text: 'ArrayField', link: '/api/models/ArrayField' },
          { text: 'ObjectField', link: '/api/models/ObjectField' },
          { text: 'VoidField', link: '/api/models/VoidField' },
          { text: 'Query', link: '/api/models/Query' },
        ],
      },
    ],
    '/en/guide/': [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/en/guide/' },
          { text: 'Architecture', link: '/en/guide/architecture' },
          { text: 'MVVM Pattern', link: '/en/guide/mvvm' },
          { text: 'Form', link: '/en/guide/form' },
          { text: 'Field', link: '/en/guide/field' },
          { text: 'Values & State', link: '/en/guide/values' },
        ],
      },
    ],
    '/en/api/': [
      {
        text: 'Entry API',
        items: [
          { text: 'createForm', link: '/en/api/entry/createForm' },
          { text: 'FormPath', link: '/en/api/entry/FormPath' },
          { text: 'FormChecker', link: '/en/api/entry/FormChecker' },
          { text: 'FormEffectHooks', link: '/en/api/entry/FormEffectHooks' },
          { text: 'FieldEffectHooks', link: '/en/api/entry/FieldEffectHooks' },
          { text: 'FormHooksAPI', link: '/en/api/entry/FormHooksAPI' },
          { text: 'FormValidatorRegistry', link: '/en/api/entry/FormValidatorRegistry' },
        ],
      },
      {
        text: 'Models',
        items: [
          { text: 'Form', link: '/en/api/models/Form' },
          { text: 'Field', link: '/en/api/models/Field' },
          { text: 'ArrayField', link: '/en/api/models/ArrayField' },
          { text: 'ObjectField', link: '/en/api/models/ObjectField' },
          { text: 'VoidField', link: '/en/api/models/VoidField' },
          { text: 'Query', link: '/en/api/models/Query' },
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
          { text: 'Reactive', link: 'https://reactive.silver-formily.org/' },
          { text: 'Vue', link: 'https://vue.silver-formily.org/' },
          { text: 'Reactive Vue', link: 'https://reactive-vue.silver-formily.org/' },
          { text: 'Element Plus', link: 'https://element-plus.silver-formily.org/' },
          { text: 'Grid', link: 'https://grid.silver-formily.org/' },
          { text: 'Validator', link: 'https://validator.silver-formily.org/' },
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
      include: ['@silver-formily/core'],
    },
  },
  extra: {
    appearance: true,
  },
})
