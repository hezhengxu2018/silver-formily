import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createDocsConfig } from '@silver-formily/docs-toolkit'
import pkg from '@silver-formily/vant/package.json' with { type: 'json' }

const currentDir = dirname(fileURLToPath(import.meta.url))
const vantSource = `${path.resolve(currentDir, '../../../packages/vant/src')}/`

export default createDocsConfig({
  pkg,
  alias: {
    '@silver-formily/vant': vantSource,
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Silver Formily Vant',
      description: 'Vant 的 Formily 封装骨架',
      themeConfig: {
        nav: [
          { text: '组件', link: '/component/quick-start', activeMatch: '/component/' },
        ],
        sidebar: {
          '/component/': [
            {
              text: '开始',
              items: [
                { text: '快速开始', link: '/component/quick-start' },
              ],
            },
            {
              text: '基础组件',
              items: [
                { text: 'Calendar', link: '/component/calendar' },
                { text: 'FormItem', link: '/component/form-item' },
                { text: 'Input', link: '/component/input' },
              ],
            },
          ],
        },
      },
    },
  },
  footer: {
    message: 'Released under the MIT License.',
  },
  socialLinks: [
    { icon: 'github', link: 'https://github.com/hezhengxu2018/silver-formily' },
  ],
  themeConfig: {
    outline: [2, 4],
    mobilePreview: {
      previewPath: 'preview/',
      deviceWidth: 375,
      deviceHeight: 700,
      demoRoot: 'zh/demos/',
    },
  },
  vite: {
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
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
        'vant',
      ],
    },
  },
  extra: {
    rewrites: {
      'zh/:slug*': ':slug*',
    },
    title: 'Silver Formily Vant',
    description: 'Formily bindings for Vant',
  },
})
