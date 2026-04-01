import type { PreviewTextProps } from './types'
import { computed, inject } from 'vue'

export const previewTextConfigKey = Symbol('vantPreviewTextConfig')

export function usePreviewConfig() {
  const previewConfig = inject(previewTextConfigKey, {} as PreviewTextProps)
  const placeholder = computed(() => previewConfig.placeholder || '-')

  return {
    placeholder,
  }
}
