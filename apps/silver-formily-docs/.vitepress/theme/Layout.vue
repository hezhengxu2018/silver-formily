<script setup lang="ts">
import DefaultTheme from '@silver-formily/docs-toolkit/theme'
import { useData } from 'vitepress'
import { computed } from 'vue'
import HomeTechGridBackground from './components/HomeTechGridBackground.vue'

const { frontmatter } = useData()
const { Layout } = DefaultTheme

const showPortalBackground = computed(() => {
  const pageClass = String(frontmatter.value?.pageClass ?? '')
  return pageClass.includes('portal-home')
})
</script>

<template>
  <div class="portal-layout-shell">
    <HomeTechGridBackground v-if="showPortalBackground" />
    <Layout />
  </div>
</template>

<style scoped>
.portal-layout-shell {
  position: relative;
}

.portal-layout-shell :deep(.Layout) {
  position: relative;
  z-index: 1;
}

.portal-layout-shell :deep(.portal-home) {
  position: relative;
}

.portal-layout-shell :deep(.portal-home .VPHome),
.portal-layout-shell :deep(.portal-home .vp-doc) {
  position: relative;
  z-index: 1;
}

.portal-layout-shell :deep(.portal-home .VPHero) {
  position: relative;
  isolation: isolate;
}

.portal-layout-shell :deep(.portal-home .VPHero .container),
.portal-layout-shell :deep(.portal-home .VPFeatures) {
  position: relative;
  z-index: 1;
}

.portal-layout-shell :deep(.portal-home .VPHero .main),
.portal-layout-shell :deep(.portal-home .VPHero .image-container),
.portal-layout-shell :deep(.portal-home .VPFeature) {
  text-shadow: 0 2px 24px rgba(248, 250, 252, 0.38);
}

.dark .portal-layout-shell :deep(.portal-home .VPHero .main),
.dark .portal-layout-shell :deep(.portal-home .VPHero .image-container),
.dark .portal-layout-shell :deep(.portal-home .VPFeature) {
  text-shadow: 0 2px 24px rgba(2, 6, 23, 0.72);
}

.portal-layout-shell :deep(.portal-home .VPFeature),
.portal-layout-shell :deep(.portal-home .vp-doc table),
.portal-layout-shell :deep(.portal-home .vp-doc blockquote) {
  backdrop-filter: blur(14px);
}

@media (max-width: 768px) {
  .portal-layout-shell :deep(.portal-home .VPHero) {
    padding-top: 24px;
  }

  .portal-layout-shell :deep(.portal-home .VPHome) {
    overflow: clip;
  }
}
</style>
