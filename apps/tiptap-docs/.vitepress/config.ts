import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createDocsConfig } from '@silver-formily/docs-toolkit'
import pkg from '../../../packages/tiptap/package.json' with { type: 'json' }

const SITE_URL = 'https://tiptap.silver-formily.org'

const currentDir = dirname(fileURLToPath(import.meta.url))
const demoDir = path.resolve(currentDir, '../zh/demos')
const tiptapSourceDir = path.resolve(currentDir, '../../../packages/tiptap/src')
const tiptapSourceEntry = path.resolve(tiptapSourceDir, 'index.ts')

export default createDocsConfig({
  pkg,
  demoDir,
  demoCodeFold: true,
  alias: {
    '@silver-formily/tiptap': tiptapSourceEntry,
    '@silver-formily/tiptap/': `${tiptapSourceDir}/`,
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Silver Formily Tiptap',
      description: '基于 Tiptap 的 Silver Formily 富文本封装',
      themeConfig: {
        nav: [
          { text: '指南', link: '/component/quick-start' },
          { text: '组件', link: '/component/rich-text' },
        ],
        sidebar: {
          '/component/': [
            {
              text: 'Guide',
              items: [
                { text: '快速开始', link: '/component/quick-start' },
              ],
            },
            {
              text: 'Components',
              items: [
                { text: 'RichText', link: '/component/rich-text' },
              ],
            },
          ],
        },
        footer: {
          message: '本项目基于 MIT 协议开源',
        },
      },
    },
  },
  head: [
    ['meta', { name: 'description', content: 'Silver Formily Tiptap 富文本封装文档与在线示例' }],
    ['meta', { name: 'keywords', content: 'Formily, Tiptap, Vue, 富文本, 编辑器' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Silver Formily Tiptap' }],
    ['meta', { property: 'og:title', content: 'Silver Formily Tiptap' }],
    ['meta', { property: 'og:description', content: '基于 Tiptap 的 Formily 富文本封装文档、示例与预览站' }],
    ['meta', { property: 'og:url', content: SITE_URL }],
    ['link', { rel: 'canonical', href: SITE_URL }],
  ],
  footer: {
    message: 'Released under the MIT License.',
    blogroll: [
      {
        title: 'Silver Formily',
        children: [
          { text: 'Vue', link: 'https://vue.silver-formily.org/' },
          { text: 'Element Plus', link: 'https://element-plus.silver-formily.org/' },
        ],
      },
      {
        title: 'Related',
        children: [
          { text: 'Tiptap', link: 'https://tiptap.dev/' },
          { text: 'Formily', link: 'https://core.formilyjs.org/' },
        ],
      },
    ],
  },
  socialLinks: [
    { icon: 'github', link: 'https://github.com/hezhengxu2018/silver-formily' },
  ],
  themeConfig: {
    aside: true,
    outline: [2, 4],
  },
  vite: {
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
    },
    resolve: {
      dedupe: [
        'vue',
        '@tiptap/core',
        '@tiptap/pm',
        '@tiptap/starter-kit',
        '@tiptap/vue-3',
      ],
    },
    ssr: {
      noExternal: [
        '@silver-formily/tiptap',
        '@silver-formily/vue',
        '@tiptap/core',
        '@tiptap/pm',
        '@tiptap/starter-kit',
        '@tiptap/vue-3',
      ],
    },
    optimizeDeps: {
      exclude: ['@silver-formily/tiptap'],
      include: [
        '@formily/core',
        '@formily/json-schema',
        '@formily/reactive',
        '@formily/shared',
        '@silver-formily/vue',
        '@tiptap/core',
        '@tiptap/starter-kit',
        '@tiptap/vue-3',
      ],
    },
  },
  extra: {
    rewrites: {
      'zh/:slug*': ':slug*',
    },
    title: 'Silver Formily Tiptap',
    description: 'Tiptap wrapper for Silver Formily',
    sitemap: {
      hostname: SITE_URL,
    },
  },
})
