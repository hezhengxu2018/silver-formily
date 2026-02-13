import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { createDocsConfig } from '@silver-formily/docs-toolkit'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/vite'
import pkg from '../../../packages/vue/package.json'
import { enLocale, enSidebar } from './i18n/en'
import { zhLocale, zhSidebar } from './i18n/zh'

const SITE_URL = 'https://vue.silver-formily.org'

const currentDir = dirname(fileURLToPath(import.meta.url))
const demoDir = path.resolve(currentDir, '../demos')

const footer = {
  message: 'Released under the MIT License.',
  blogroll: [
    {
      title: 'Formily',
      children: [
        { text: 'Core', link: 'https://core.formilyjs.org/' },
        { text: 'Reactive', link: 'https://reactive.formilyjs.org/' },
        { text: 'Vue', link: 'https://vue.formilyjs.org/' },
      ],
    },
    {
      title: 'Silver Formily',
      children: [
        { text: 'Vue', link: SITE_URL },
        { text: 'Element Plus', link: 'https://element-plus.silver-formily.org/' },
        { text: 'Reactive Vue', link: 'https://reactive-vue.silver-formily.org/' },
      ],
    },
  ],
}

const sidebar = {
  ...zhSidebar,
  ...enSidebar,
}

export default createDocsConfig({
  pkg,
  demoDir,
  locales: {
    root: zhLocale,
    en: enLocale,
  },
  sidebar,
  head: [
    ['meta', { name: 'description', content: 'Formily 的 Vue3 封装库和使用指南' }],
    ['meta', { name: 'keywords', content: 'Formily, Vue, 表单' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Silver Formily Vue' }],
    ['meta', { property: 'og:title', content: 'Silver Formily Vue' }],
    ['meta', { property: 'og:description', content: 'Formily Vue 组件库文档、示例与最佳实践' }],
    ['meta', { property: 'og:url', content: SITE_URL }],
    ['link', { rel: 'canonical', href: SITE_URL }],
  ],
  footer,
  socialLinks: [
    { icon: 'github', link: 'https://github.com/hezhengxu2018/silver-formily' },
  ],
  markdown: {
    codeTransformers: [transformerTwoslash()],
  },
  vite: {
    plugins: [
      VueMacros({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vueJsx: vueJsx(),
        },
      }),
    ],
    optimizeDeps: {
      include: [
        '@formily/core',
        '@formily/reactive',
        '@formily/shared',
        '@formily/json-schema',
        '@silver-formily/reactive-vue',
        'element-plus',
      ],
    },
  },
  themeConfig: {
    aside: true,
    outline: [2, 4],
  },
  extra: {
    title: 'Silver Formily Vue',
    description: 'Vue 3 wrapper for Formily',
    sitemap: {
      hostname: SITE_URL,
    },
  },
})
