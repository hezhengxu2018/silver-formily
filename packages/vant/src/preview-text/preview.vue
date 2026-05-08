<script setup lang="ts">
import type { PreviewTextProps } from './types'
import { provide, reactive } from 'vue'
import { previewTextConfigKey } from './utils'

defineOptions({
  name: 'FPreviewTextProvider',
  inheritAttrs: false,
})

const props = defineProps<PreviewTextProps>()

provide(previewTextConfigKey, reactive({
  placeholder: props.placeholder,
}))
</script>

<template>
  <slot />
</template>
