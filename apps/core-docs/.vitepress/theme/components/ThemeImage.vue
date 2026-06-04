<script setup lang="ts">
import { ElImage } from 'element-plus'
import { useData } from 'vitepress'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  light: string
  dark?: string
  alt: string
  preview?: boolean
}>(), {
  preview: true,
})

const { isDark } = useData()

const imageSrc = computed(() => {
  return isDark.value && props.dark ? props.dark : props.light
})

const previewList = computed(() => {
  return props.preview === false ? [] : [imageSrc.value]
})
</script>

<template>
  <ElImage
    class="theme-image"
    :src="imageSrc"
    :alt="alt"
    fit="contain"
    :preview-src-list="previewList"
    :initial-index="0"
    preview-teleported
    hide-on-click-modal
  />
</template>

<style scoped>
.theme-image {
  display: block;
  width: fit-content;
  max-width: 100%;
  cursor: zoom-in;
}

.theme-image :deep(.el-image__inner) {
  display: block;
  max-width: 100%;
  height: auto;
}

.theme-image :deep(.el-image__error) {
  min-height: 120px;
}

:global(.el-image-viewer__mask) {
  background-color: var(--vp-c-bg);
  opacity: 1;
}
</style>
