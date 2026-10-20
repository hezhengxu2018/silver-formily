import type { Component, InjectionKey } from 'vue'

export type MobilePreviewModule = () => Promise<unknown>
export type MobilePreviewRegistry = Record<string, MobilePreviewModule>

export const mobilePreviewRegistryKey: InjectionKey<MobilePreviewRegistry>

export function withThemeSync(
  layout: Component,
  syncTheme: (isDark: boolean, root: HTMLElement) => void,
): Component

declare const theme: any
export default theme
