import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import mdContainer from 'markdown-it-container'
import { defineConfig } from 'vitepress'
import { createDemoContainer } from 'vitepress-better-demo-plugin'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import {
  mdExternalLinkIcon,
  mdTableWrapper,
  mdTag,
  mdTaskList,
  mdTooltip,
} from 'vitepress-theme-element-plus/node'

const DEFAULT_HEAD = [
  ['link', { rel: 'icon', href: '/favicon.svg' }],
  ['meta', { name: 'theme-color', content: '#3b82f6' }],
]
const DEFAULT_NO_EXTERNAL = [
  'vitepress-theme-element-plus',
  'vitepress-better-demo-plugin',
  'vitepress-plugin-nprogress',
]
const DEFAULT_OPTIMIZE_EXCLUDE = ['vitepress-theme-element-plus']
const INTERNAL_WORKSPACE_PREFIX = '@silver-formily/'

function createLocalizedLink(text, baseUrl, localizedLinks = {}) {
  return {
    text,
    link: baseUrl,
    localizedLinks,
  }
}

export const silverFormilyFoundationFooterLinks = [
  createLocalizedLink('Core', 'https://core.silver-formily.org/', { en: 'https://core.silver-formily.org/en/' }),
  createLocalizedLink('JSON Schema', 'https://json-schema.silver-formily.org/', { en: 'https://json-schema.silver-formily.org/en/' }),
  createLocalizedLink('Path', 'https://path.silver-formily.org/', { en: 'https://path.silver-formily.org/en/' }),
  createLocalizedLink('Validator', 'https://validator.silver-formily.org/', { en: 'https://validator.silver-formily.org/en/' }),
  createLocalizedLink('Reactive', 'https://reactive.silver-formily.org/', { en: 'https://reactive.silver-formily.org/en/' }),
]

export const silverFormilyFrameworkFooterLinks = [
  createLocalizedLink('Vue', 'https://vue.silver-formily.org/', { en: 'https://vue.silver-formily.org/en/' }),
  createLocalizedLink('Reactive Vue', 'https://reactive-vue.silver-formily.org/', { en: 'https://reactive-vue.silver-formily.org/en/' }),
]

export const silverFormilyUiFooterLinks = [
  createLocalizedLink('Grid', 'https://grid.silver-formily.org/', { en: 'https://grid.silver-formily.org/en/' }),
  createLocalizedLink('Element Plus', 'https://element-plus.silver-formily.org/', { en: 'https://element-plus.silver-formily.org/en/' }),
  createLocalizedLink('Vant', 'https://vant.silver-formily.org/', { en: 'https://vant.silver-formily.org/en/' }),
]

export const silverFormilyFooterLinks = [
  ...silverFormilyFoundationFooterLinks,
  ...silverFormilyFrameworkFooterLinks,
  ...silverFormilyUiFooterLinks,
]

export const formilyFooterLinks = [
  createLocalizedLink('Core', 'https://core.formilyjs.org/', { en: 'https://core.formilyjs.org/en-US/' }),
  createLocalizedLink('Reactive', 'https://reactive.formilyjs.org/', { en: 'https://reactive.formilyjs.org/en-US/' }),
  createLocalizedLink('Vue', 'https://vue.formilyjs.org/', { en: 'https://vue.formilyjs.org/en-US/' }),
  createLocalizedLink('React', 'https://react.formilyjs.org/', { en: 'https://react.formilyjs.org/en-US/' }),
]

export const zhDefaultFooterBlogroll = [
  {
    title: 'Silver Formily 底层库',
    children: silverFormilyFoundationFooterLinks,
  },
  {
    title: '前端框架绑定库',
    children: silverFormilyFrameworkFooterLinks,
  },
  {
    title: '组件库绑定库',
    children: silverFormilyUiFooterLinks,
  },
  {
    title: 'Formily 官方文档',
    children: formilyFooterLinks,
  },
]

export const enDefaultFooterBlogroll = [
  {
    title: 'Silver Formily Foundations',
    children: silverFormilyFoundationFooterLinks,
  },
  {
    title: 'Framework Bindings',
    children: silverFormilyFrameworkFooterLinks,
  },
  {
    title: 'UI Bindings',
    children: silverFormilyUiFooterLinks,
  },
  {
    title: 'Formily',
    children: formilyFooterLinks,
  },
]

export const defaultFooterBlogroll = zhDefaultFooterBlogroll

function normalizeUrl(url) {
  return url?.replace(/\/+$/, '')
}

function resolveLocalizedLink(link, lang) {
  if (!link) {
    return link
  }

  const normalizedLang = lang?.toLowerCase() ?? ''
  const localizedLink = normalizedLang.startsWith('en')
    ? link.localizedLinks?.en
    : undefined

  return {
    ...link,
    link: localizedLink ?? link.link,
  }
}

function resolveCurrentSiteUrl(pkg) {
  if (!pkg?.name?.startsWith(INTERNAL_WORKSPACE_PREFIX)) {
    return undefined
  }

  const siteName = pkg.name.slice(INTERNAL_WORKSPACE_PREFIX.length)
  return `https://${siteName}.silver-formily.org`
}

function filterBlogrollLinks(blogroll, pkg) {
  const currentSiteUrl = resolveCurrentSiteUrl(pkg)
  if (!currentSiteUrl) {
    return blogroll
  }

  const currentSiteUrls = new Set([
    normalizeUrl(currentSiteUrl),
    normalizeUrl(`${currentSiteUrl}/en`),
  ])

  return blogroll
    .map(column => ({
      ...column,
      children: column.children?.filter(link => !currentSiteUrls.has(normalizeUrl(link.link))),
    }))
    .filter(column => column.children?.length)
}

function resolveDefaultFooterBlogroll(lang, pkg) {
  const baseBlogroll = lang?.toLowerCase().startsWith('zh')
    ? zhDefaultFooterBlogroll
    : enDefaultFooterBlogroll

  const localizedBlogroll = baseBlogroll.map(column => ({
    ...column,
    children: column.children?.map(link => resolveLocalizedLink(link, lang)),
  }))

  return filterBlogrollLinks(localizedBlogroll, pkg)
}

function resolveFooterConfig(baseFooter, localeFooter, lang, pkg) {
  if (!baseFooter && !localeFooter) {
    return undefined
  }

  return {
    ...baseFooter,
    blogroll: resolveDefaultFooterBlogroll(lang, pkg),
    ...localeFooter,
  }
}

function resolveLocales(locales, footer, pkg) {
  if (!locales) {
    return locales
  }

  return Object.fromEntries(
    Object.entries(locales).map(([key, locale]) => [
      key,
      {
        ...locale,
        themeConfig: {
          ...(locale.themeConfig ?? {}),
          footer: resolveFooterConfig(footer, locale.themeConfig?.footer, locale.lang, pkg),
        },
      },
    ]),
  )
}

function getWorkspacePackageDependencies() {
  const packageJsonPath = path.join(process.cwd(), 'package.json')
  if (!existsSync(packageJsonPath)) {
    return []
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
  const dependencyGroups = [
    packageJson.dependencies,
    packageJson.devDependencies,
    packageJson.peerDependencies,
  ]

  return Array.from(
    new Set(
      dependencyGroups
        .flatMap(group => Object.keys(group ?? {}))
        .filter(name => name.startsWith(INTERNAL_WORKSPACE_PREFIX)),
    ),
  )
}

export function createDocsConfig(options = {}) {
  const {
    alias = {},
    demoDir,
    demoCodeFold = false,
    head = [],
    locales,
    sidebar,
    footer,
    socialLinks,
    pkg,
    vite = {},
    markdown,
    themeConfig = {},
    extra = {},
  } = options

  const mergedHead = [...DEFAULT_HEAD, ...head]
  const markdownOptions = markdown ?? {}
  const workspacePackageDependencies = getWorkspacePackageDependencies()
  const resolvedFooter = resolveFooterConfig(footer, undefined, locales?.root?.lang, pkg)
  const resolvedLocales = resolveLocales(locales, footer, pkg)

  return defineConfig({
    ...extra,
    locales: resolvedLocales,
    head: mergedHead,
    vite: {
      ...vite,
      resolve: {
        ...(vite?.resolve ?? {}),
        alias: {
          ...(vite?.resolve?.alias ?? {}),
          ...alias,
        },
      },
      plugins: [
        groupIconVitePlugin(),
        ...(vite?.plugins ?? []),
      ],
      ssr: {
        ...(vite?.ssr ?? {}),
        noExternal: Array.from(
          new Set([
            ...(vite?.ssr?.noExternal ?? []),
            ...DEFAULT_NO_EXTERNAL,
            ...workspacePackageDependencies,
          ]),
        ),
      },
      optimizeDeps: {
        ...(vite?.optimizeDeps ?? {}),
        exclude: Array.from(
          new Set([
            ...(vite?.optimizeDeps?.exclude ?? []),
            ...DEFAULT_OPTIMIZE_EXCLUDE,
            ...workspacePackageDependencies,
          ]),
        ),
      },
      build: {
        cssMinify: false,
        ...(vite?.build ?? {}),
      },
    },
    markdown: {
      ...markdownOptions,
      config(md) {
        md.use(groupIconMdPlugin)
        md.use(mdExternalLinkIcon)
        md.use(mdTag)
        md.use(mdTooltip)
        md.use(mdTableWrapper)
        md.use(mdTaskList, { disabled: false })
        if (demoDir) {
          md.use(mdContainer, 'demo', createDemoContainer(md, {
            demoDir,
            autoImportWrapper: false,
            codeFold: demoCodeFold,
            ssg: true,
          }))
        }
        markdownOptions.config?.(md)
      },
    },
    themeConfig: {
      logo: '/logo.svg',
      search: { provider: 'local' },
      externalLinkIcon: true,
      sidebar,
      footer: resolvedFooter,
      socialLinks,
      version: themeConfig.version ?? pkg?.version,
      ...themeConfig,
    },
  })
}
