import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createDocsConfig } from '@silver-formily/docs-toolkit'
import pkg from '@silver-formily/validator/package.json' with { type: 'json' }

const currentDir = dirname(fileURLToPath(import.meta.url))
const validatorSource = `${path.resolve(currentDir, '../../../packages/validator/src')}/`

export default createDocsConfig({
  pkg,
  alias: {
    '@silver-formily/validator': validatorSource,
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Silver Formily Validator',
      description: 'Validator 规则、注册中心与模板渲染 API 文档',
      themeConfig: {
        nav: [
          { text: '文档', link: '/', activeMatch: '^/$|^/api/' },
        ],
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Silver Formily Validator',
      description: 'Validator rules, registry APIs, and message rendering docs',
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
          { text: '在 Formily 中使用', link: '/guide/formily-validator' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: '快速开始', link: '/api/quick-start' },
          { text: '校验规则', link: '/api/validate' },
          { text: '注册中心', link: '/api/registry' },
          { text: '解析器', link: '/api/parser' },
        ],
      },
    ],
    '/en/': [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/en/' },
          { text: 'Using with Formily', link: '/en/guide/formily-validator' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'Quick Start', link: '/en/api/quick-start' },
          { text: 'Validation Rules', link: '/en/api/validate' },
          { text: 'Registry', link: '/en/api/registry' },
          { text: 'Parser', link: '/en/api/parser' },
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
          { text: 'Path', link: 'https://path.silver-formily.org/' },
          { text: 'Reactive', link: 'https://reactive.silver-formily.org/' },
          { text: 'Vue', link: 'https://vue.silver-formily.org/' },
          { text: 'Reactive Vue', link: 'https://reactive-vue.silver-formily.org/' },
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
      include: ['@silver-formily/validator'],
    },
  },
  extra: {
    appearance: true,
  },
})
