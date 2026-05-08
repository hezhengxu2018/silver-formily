import type { MobilePreviewRegistry } from '@silver-formily/docs-toolkit/theme'
import type { InjectionKey } from 'vue'

const docsDemoRoot = 'zh/demos/'

export const docsDemoRegistryKey: InjectionKey<MobilePreviewRegistry> = Symbol('vant-docs.demo-registry')

export function normalizeDocsDemoId(value: string): string {
  return value
    .trim()
    .replace(/\\/g, '/')
    .replace(/^@\//, '')
    .replace(/^\.?\//, '')
}

export function resolveDocsDemoId(value: string): string {
  const normalizedId = normalizeDocsDemoId(value)
  if (!normalizedId)
    return ''

  return normalizedId.startsWith(docsDemoRoot)
    ? normalizedId
    : `${docsDemoRoot}${normalizedId}`
}
