import type { UserConfig } from 'vitepress'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createDocsConfig } from '@silver-formily/docs-toolkit'
import pkg from '@silver-formily/element-plus/package.json' with { type: 'json' }
import vueJsx from '@vitejs/plugin-vue-jsx'
import zhComponent from './i18n/zh/pages/component.json'
import zhNav from './i18n/zh/pages/nav.json'

const SITE_URL = 'https://element-plus.silver-formily.org'

const currentDir = dirname(fileURLToPath(import.meta.url))
const demoDir = path.resolve(currentDir, '../zh/demos')
const elementPlusSource = `${path.resolve(currentDir, '../../../packages/element-plus/src')}/`
type DocsPluginOption = NonNullable<NonNullable<UserConfig['vite']>['plugins']>[number]
export default createDocsConfig({
  pkg,
  demoDir,
  demoCodeFold: true,
  alias: {
    '@silver-formily/element-plus': elementPlusSource,
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Silver Formily Element Plus',
      description: 'Element Plus 的 Formily 封装',
      themeConfig: {
        nav: zhNav,
        sidebar: {
          '/guide/': [
            {
              text: 'Guide',
              items: [
                { text: '介绍', link: '/guide/introduction' },
                { text: '重大改动', link: '/guide/breaking-changes' },
              ],
            },
          ],
          '/component/': zhComponent,
        },
        footer: {
          message: '本项目基于 MIT 协议开源',
        },
      },
    },
  },
  head: [
    ['meta', { name: 'description', content: 'Element Plus 的 Formily 封装组件库和使用指南' }],
    ['meta', { name: 'keywords', content: 'Formily, Element Plus, 表单, 组件库, Vue' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Silver Formily Element Plus' }],
    ['meta', { property: 'og:title', content: 'Silver Formily Element Plus' }],
    ['meta', { property: 'og:description', content: 'Formily + Element Plus 组件库文档、示例与最佳实践' }],
    ['meta', { property: 'og:url', content: SITE_URL }],
    ['link', { rel: 'canonical', href: SITE_URL }],
  ],
  footer: {
    message: 'Released under the MIT License.',
    blogroll: [
      {
        title: 'Formily',
        children: [
          { text: 'Core', link: 'https://core.formilyjs.org/' },
          { text: 'Reactive', link: 'https://reactive.formilyjs.org/' },
        ],
      },
      {
        title: 'Silver Formily',
        children: [
          { text: 'Vue', link: 'https://vue.silver-formily.org' },
          { text: 'Reactive Vue', link: 'https://reactive-vue.silver-formily.org' },
          { text: 'Grid', link: 'https://grid.silver-formily.org/' },
        ],
      },
      {
        title: 'Rebuilt Formily Docs',
        children: [
          { text: 'Reactive', link: 'https://reactive.silver-formily.org/' },
          { text: 'JSON Schema', link: 'https://json-schema.silver-formily.org/' },
        ],
      },
    ],
  },
  socialLinks: [
    { icon: 'github', link: 'https://github.com/hezhengxu2018/silver-formily' },
  ],
  themeConfig: {
    logo: '/formily-logo.svg',
    outline: [2, 4],
  },
  vite: {
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
    },
    plugins: [vueJsx() as unknown as DocsPluginOption],
    resolve: {
      dedupe: ['vue', 'element-plus'],
    },
    ssr: {
      noExternal: ['@silver-formily/vue'],
    },
    optimizeDeps: {
      include: [
        '@formily/core',
        '@formily/reactive',
        '@formily/shared',
        '@silver-formily/reactive-vue',
        '@silver-formily/vue',
        '@silver-formily/grid',
        '@element-plus/icons-vue',
        'element-plus',
        'lodash-es',
        'vue-draggable-plus',
      ],
    },
  },
  extra: {
    rewrites: {
      'zh/:slug*': ':slug*',
    },
    title: 'Silver Formily Element Plus',
    description: 'Formily bindings for Element Plus',
    sitemap: {
      hostname: SITE_URL,
    },
    postRender(context) {
      if (!context.teleports)
        return context
      const body = Object.entries(context.teleports).reduce((all, [key, value]) => {
        if (key.startsWith('#el-popper-container-')) {
          return `${all}<div id="${key.slice(1)}">${value}</div>`
        }
        return all
      }, context.teleports.body || '')
      context.teleports = { ...context.teleports, body }
      return context
    },
  },
})
