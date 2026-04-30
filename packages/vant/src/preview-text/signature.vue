<script setup lang="ts">
import type { PreviewTextSignatureProps } from './types'
import { computed } from 'vue'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextSignature',
  inheritAttrs: false,
})

const props = defineProps<PreviewTextSignatureProps>()

const { placeholder } = usePreviewConfig()
const hasValue = computed(() => {
  return Boolean(props.modelValue)
})
</script>

<template>
  <div class="van-field__control">
    <template v-if="!hasValue">
      {{ placeholder }}
    </template>
    <img
      v-else
      class="silver-formily-vant-preview-signature"
      :src="props.modelValue || undefined"
      alt="signature"
    >
  </div>
</template>

<style scoped>
.silver-formily-vant-preview-signature {
  display: block;
  width: 100%;
  max-width: 100%;
  max-height: 240px;
  object-fit: contain;
  border: 1px solid var(--van-border-color);
  border-radius: var(--van-radius-md);
  background: var(--van-background-2);
}
</style>
