import { fileURLToPath, URL } from 'node:url'
import { createDocsConfig } from '@silver-formily/docs-toolkit'
import pkg from '../package.json' with { type: 'json' }

export default createDocsConfig({
  pkg: pkg as { version?: string },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Silver Formily',
      description: 'Silver Formily',
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Silver Formily',
      description: 'Silver Formily',
    },
  },
  head: [
    ['meta', { name: 'description', content: 'Silver Formily' }],
    ['meta', { name: 'keywords', content: 'Silver Formily, Formily, docs, guide, ecosystem' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Silver Formily Docs' }],
    ['meta', { property: 'og:title', content: 'Silver Formily Docs' }],
    ['meta', { property: 'og:description', content: 'Silver Formily.' }],
  ],
  footer: {
    message: 'Released under the MIT License.',
  },
  socialLinks: [
    { icon: 'github', link: 'https://github.com/hezhengxu2018/silver-formily' },
  ],
  themeConfig: {
    logo: '/logo.svg',
    outline: false,
    aside: false,
  },
  extra: {
    title: 'Silver Formily Docs',
    description: 'Silver Formily',
    appearance: true,
  },
  vite: {
    resolve: {
      alias: {
        'vitepress/dist/client/theme-default/components/VPHomeHero.vue': fileURLToPath(
          new URL('./theme/components/HomeHero.vue', import.meta.url),
        ),
      },
    },
  },
})
