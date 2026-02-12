import type { UserConfig } from 'vitepress'
import type { EPThemeConfig } from 'vitepress-theme-element-plus'

export interface DocsConfigOptions extends Omit<UserConfig<EPThemeConfig>, 'vite' | 'markdown' | 'themeConfig' | 'head' | 'locales'> {
  alias?: Record<string, string>
  demoDir?: string
  head?: UserConfig['head']
  locales?: UserConfig['locales']
  sidebar?: EPThemeConfig['sidebar']
  footer?: EPThemeConfig['footer']
  socialLinks?: EPThemeConfig['socialLinks']
  pkg?: { version?: string }
  vite?: UserConfig['vite']
  markdown?: UserConfig['markdown']
  themeConfig?: Partial<EPThemeConfig>
  extra?: Omit<UserConfig<EPThemeConfig>, 'vite' | 'markdown' | 'themeConfig' | 'head' | 'locales'>
}

export function createDocsConfig(options?: DocsConfigOptions): UserConfig<EPThemeConfig>
