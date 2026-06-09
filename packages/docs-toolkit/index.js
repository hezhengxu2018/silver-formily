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

  return defineConfig({
    ...extra,
    locales,
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
      footer,
      socialLinks,
      version: themeConfig.version ?? pkg?.version,
      ...themeConfig,
    },
  })
}
