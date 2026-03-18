<script setup lang="ts">
import type { Component } from 'vue'
import { computed, inject, markRaw, shallowRef, watch } from 'vue'
import { docsDemoRegistryKey, resolveDocsDemoId } from '../docs-demo-registry'

defineOptions({
  name: 'DocsDemoRenderer',
})

const props = defineProps<{
  path: string
}>()

const registry = inject(docsDemoRegistryKey)
const demoComponent = shallowRef<Component>()
const errorMessage = shallowRef('')

const demoId = computed(() => resolveDocsDemoId(props.path))
const statusMessage = computed(() => errorMessage.value || 'Loading demo...')

async function loadDemo(value: string): Promise<void> {
  demoComponent.value = undefined
  errorMessage.value = ''

  if (!value) {
    errorMessage.value = 'Missing demo path.'
    return
  }

  if (!registry) {
    errorMessage.value = 'No demo registry was provided.'
    return
  }

  const loader = registry[value]
  if (!loader) {
    errorMessage.value = `Unknown demo: ${value}`
    return
  }

  try {
    const module = await loader()
    const resolvedComponent = (module as { default?: Component }).default ?? module
    demoComponent.value = markRaw(resolvedComponent as Component)
  }
  catch (error) {
    errorMessage.value = error instanceof Error
      ? error.message
      : 'Failed to load the requested demo.'
  }
}

watch(demoId, value => void loadDemo(value), { immediate: true })
</script>

<template>
  <div class="docs-demo-renderer">
    <component :is="demoComponent" v-if="demoComponent" />
    <div v-else class="docs-demo-renderer__status">
      {{ statusMessage }}
    </div>
  </div>
</template>

<style scoped>
.docs-demo-renderer {
  min-width: 0;
}

.docs-demo-renderer__status {
  padding: 16px;
  color: var(--van-text-color-2);
  font-size: 12px;
  line-height: 1.5;
  background: var(--van-background-2);
}

.docs-demo-renderer :deep(.demo-panel) {
  overflow: hidden;
  background: var(--van-background-2);
}

.docs-demo-renderer :deep(.demo-panel--inset) {
  margin: 0 12px;
  border-radius: 16px;
}

.docs-demo-renderer :deep(.demo-panel--padded) {
  padding: 16px;
}
</style>
