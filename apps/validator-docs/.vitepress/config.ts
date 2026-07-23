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
          { text: '快速上手', link: '/guide/quick-start' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: '执行校验', link: '/api/validate' },
          { text: '注册与配置', link: '/api/registry' },
          { text: '规则解析', link: '/api/parser' },
        ],
      },
    ],
    '/en/': [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/en/' },
          { text: 'Quick Start', link: '/en/guide/quick-start' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'Run Validation', link: '/en/api/validate' },
          { text: 'Registry and Configuration', link: '/en/api/registry' },
          { text: 'Rule Parsing', link: '/en/api/parser' },
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
  themeConfig: {
    logo: '/logo.svg',
    outline: [2, 4],
  },
  extra: {
    appearance: true,
  },
})
