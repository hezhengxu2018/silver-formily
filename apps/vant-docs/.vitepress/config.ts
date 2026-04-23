import type { UserConfig } from 'vitepress'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createDocsConfig } from '@silver-formily/docs-toolkit'
import pkg from '@silver-formily/vant/package.json' with { type: 'json' }
import vueJsx from '@vitejs/plugin-vue-jsx'
import zhComponent from './i18n/zh/pages/component.json'
import zhNav from './i18n/zh/pages/nav.json'

const currentDir = dirname(fileURLToPath(import.meta.url))
const vantSource = `${path.resolve(currentDir, '../../../packages/vant/src')}/`
type DocsPluginOption = NonNullable<NonNullable<UserConfig['vite']>['plugins']>[number]

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
        nav: zhNav,
        sidebar: {
          '/component/': zhComponent,
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
  head: [['script', { src: 'https://cdn.jsdelivr.net/npm/prompts-js' }]],
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
    plugins: [vueJsx() as unknown as DocsPluginOption],
    ssr: {
      noExternal: ['@silver-formily/vue'],
    },
    optimizeDeps: {
      include: [
        '@formily/core',
        '@formily/reactive',
        '@formily/shared',
        '@silver-formily/grid',
        '@silver-formily/reactive-vue',
        '@silver-formily/vue',
        'dayjs',
        'dayjs/plugin/customParseFormat',
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
