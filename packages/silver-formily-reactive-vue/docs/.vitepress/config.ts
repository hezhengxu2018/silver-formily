import type { EPThemeConfig } from 'vitepress-theme-element-plus'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import mdContainer from 'markdown-it-container'
import { defineConfig } from 'vitepress'
import { createDemoContainer } from 'vitepress-better-demo-plugin'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { mdExternalLinkIcon, mdTableWrapper, mdTag, mdTaskList, mdTooltip } from 'vitepress-theme-element-plus/node'
import pkg from '../../package.json'

export default defineConfig<EPThemeConfig>({
  vite: {
    resolve: {
      alias: {
        '@silver-formily/reactive-vue': path.resolve(
          dirname(fileURLToPath(import.meta.url)),
          '../../src',
        ),
      },
    },
    plugins: [
      groupIconVitePlugin(),
    ],
    ssr: {
      noExternal: [
        'vitepress-theme-element-plus',
        'vitepress-better-demo-plugin',
      ],
    },
    optimizeDeps: {
      exclude: ['vitepress-theme-element-plus'],
      include: ['@formily/core', '@silver-formily/reactive-vue', '@formily/reactive', 'element-plus', 'dayjs'],
    },
    build: {
      cssMinify: false,
    },
  },
  // 站点配置
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Silver Formily Reactive Vue',
      description: 'Vue3 的 @formily/reactive-vue 封装',
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Silver Formily Reactive Vue',
      description: 'Vue 3 wrapper for @formily/reactive',
    },
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
  ],
  appearance: true,
  // Markdown 配置
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
      md.use(mdExternalLinkIcon)
      md.use(mdTag)
      md.use(mdTooltip)
      md.use(mdTableWrapper)
      md.use(mdTaskList, {
        disabled: false,
      })
      md.use(mdContainer, 'demo', createDemoContainer(md, {
        demoDir: path.resolve(
          dirname(fileURLToPath(import.meta.url)),
          '../demos',
        ),
        autoImportWrapper: false,
        codeFold: false,
      }))
    },
  },
  // 全局主题配置
  themeConfig: {
    // Logo 配置
    logo: '/logo.svg',

    // 搜索配置
    search: {
      provider: 'local',
    },
    sidebar: {
      '/': [
        {
          text: '指南',
          items: [
            { text: '快速上手', link: '/' },
            { text: 'API 文档', link: '/api' },
          ],
        },
      ],
      '/en/': [
        {
          text: 'Guide',
          items: [
            { text: 'Quick Start', link: '/en/' },
            { text: 'API Reference', link: '/en/api' },
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
            { text: 'Element Plus', link: 'https://element-plus.silver-formily.org/' },
            { text: 'Vue', link: 'https://vue.silver-formily.org/' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hezhengxu2018/silver-formily-reactive-vue' },
    ],
    version: pkg.version,
    externalLinkIcon: true,
  },
})
