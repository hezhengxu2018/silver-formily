import type { UserConfig } from 'vitepress'

export interface DocsSidebarItem {
  text?: string
  link?: string
  items?: DocsSidebarItem[]
}

export type DocsSidebar = Record<string, DocsSidebarItem[]>

export interface DocsThemeConfig {
  nav?: Array<{
    text: string
    link: string
    activeMatch?: string
  }>
  sidebar?: DocsSidebar
  footer?: {
    message?: string
    blogroll?: Array<{
      title?: string
      children?: Array<{ text: string, link: string }>
    }>
  }
  socialLinks?: Array<{ icon: string, link: string }>
  [key: string]: unknown
}

export interface DocsConfigOptions extends Omit<UserConfig<DocsThemeConfig>, 'vite' | 'markdown' | 'themeConfig' | 'head' | 'locales'> {
  alias?: Record<string, string>
  demoDir?: string
  head?: UserConfig['head']
  locales?: UserConfig['locales']
  sidebar?: DocsThemeConfig['sidebar']
  footer?: DocsThemeConfig['footer']
  socialLinks?: DocsThemeConfig['socialLinks']
  pkg?: { version?: string }
  vite?: UserConfig['vite']
  markdown?: UserConfig['markdown']
  themeConfig?: Partial<DocsThemeConfig>
  extra?: Omit<UserConfig<DocsThemeConfig>, 'vite' | 'markdown' | 'themeConfig' | 'head' | 'locales'>
}

export function createDocsConfig(options?: DocsConfigOptions): UserConfig<DocsThemeConfig>
export type { DocsSidebar, DocsSidebarItem, DocsThemeConfig as ThemeConfig }
