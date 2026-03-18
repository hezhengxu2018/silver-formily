import { computed, inject } from 'vue'

export interface PreviewTextProps {
  placeholder?: string
}

export const previewTextConfigKey = Symbol('vantPreviewTextConfig')

export function usePreviewConfig() {
  const previewConfig = inject(previewTextConfigKey, {} as PreviewTextProps)
  const placeholder = computed(() => previewConfig.placeholder || 'N/A')

  return {
    placeholder,
  }
}
