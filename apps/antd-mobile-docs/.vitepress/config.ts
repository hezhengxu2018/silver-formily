import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import pkg from '@silver-formily/antd-mobile/package.json' with { type: 'json' }
import { createDocsConfig } from '@silver-formily/docs-toolkit'
import zhComponent from './i18n/zh/pages/component.json'
import zhNav from './i18n/zh/pages/nav.json'

const currentDir = dirname(fileURLToPath(import.meta.url))
const antdMobileSource = `${path.resolve(currentDir, '../../../packages/antd-mobile/src')}/`

export default createDocsConfig({
  pkg,
  alias: {
    '@silver-formily/antd-mobile': antdMobileSource,
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Silver Formily Antd Mobile',
      description: 'Antd Mobile 的 Formily 封装骨架',
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
    esbuild: {
      jsx: 'automatic',
    },
    ssr: {
      // antd-mobile 的 CJS 入口会 require CSS，Node 直接加载会语法报错；
      // 声明为 noExternal 让 SSR 构建打进 ESM 版本，CSS 由 Vite 处理。
      noExternal: [
        'antd-mobile',
        'antd-mobile-icons',
        'react-sticky-box',
      ],
    },
    optimizeDeps: {
      include: [
        'antd-mobile',
      ],
    },
  },
  extra: {
    rewrites: {
      'zh/:slug*': ':slug*',
    },
    title: 'Silver Formily Antd Mobile',
    description: 'Formily bindings for Antd Mobile',
  },
})
