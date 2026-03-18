import type { InjectionKey } from 'vue'

export type MobilePreviewModule = () => Promise<unknown>
export type MobilePreviewRegistry = Record<string, MobilePreviewModule>

export const mobilePreviewRegistryKey: InjectionKey<MobilePreviewRegistry>

declare const theme: any
export default theme
