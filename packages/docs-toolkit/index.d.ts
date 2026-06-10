import type { UserConfig } from 'vitepress'

export interface DocsSidebarItem {
  text?: string
  link?: string
  items?: DocsSidebarItem[]
}

export type DocsSidebar = Record<string, DocsSidebarItem[]>

export interface DocsFooterLink {
  text: string
  link: string
  localizedLinks?: Partial<Record<'en', string>>
}

export interface DocsFooterColumn {
  title?: string
  children?: DocsFooterLink[]
}

export type DocsFooterLinks = DocsFooterLink[]

export interface DocsThemeConfig {
  nav?: Array<{
    text: string
    link: string
    activeMatch?: string
  }>
  sidebar?: DocsSidebar
  footer?: {
    message?: string
    blogroll?: DocsFooterColumn[]
  }
  socialLinks?: Array<{ icon: string, link: string }>
  [key: string]: unknown
}

export interface DocsConfigOptions extends Omit<UserConfig<DocsThemeConfig>, 'vite' | 'markdown' | 'themeConfig' | 'head' | 'locales'> {
  alias?: Record<string, string>
  demoDir?: string
  demoCodeFold?: boolean
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
export const silverFormilyFoundationFooterLinks: DocsFooterLinks
export const silverFormilyFrameworkFooterLinks: DocsFooterLinks
export const silverFormilyUiFooterLinks: DocsFooterLinks
export const silverFormilyFooterLinks: DocsFooterLinks
export const formilyFooterLinks: DocsFooterLinks
export const zhDefaultFooterBlogroll: DocsFooterColumn[]
export const enDefaultFooterBlogroll: DocsFooterColumn[]
export const defaultFooterBlogroll: DocsFooterColumn[]
export type { DocsThemeConfig as ThemeConfig }
