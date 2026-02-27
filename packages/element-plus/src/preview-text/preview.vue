<script setup lang="ts">
import type { PreviewTextProps } from './utils'
import { provide, reactive } from 'vue'
import { previewTextConfigKey } from './utils'

defineOptions({
  name: 'FPreviewTextProvider',
  inheritAttrs: false,
})

const props = defineProps<PreviewTextProps>()

provide(previewTextConfigKey, reactive({
  placeholder: props.placeholder,
  tagProps: props.tagProps,
  spaceProps: props.spaceProps,
  textProps: props.textProps,
}))
</script>

<template>
  <slot />
</template>
