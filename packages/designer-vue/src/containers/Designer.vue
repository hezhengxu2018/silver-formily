<script setup lang="ts">
import type { Engine } from '@silver-formily/designer-core'
import { onBeforeUnmount, provide, shallowRef, watch } from 'vue'
import { DesignerEngineSymbol } from '../context'

const props = defineProps<{
  engine: Engine
}>()

const engineRef = shallowRef<Engine | null>(null)

provide(DesignerEngineSymbol, engineRef)

watch(() => props.engine, (nextEngine) => {
  if (engineRef.value && engineRef.value !== nextEngine)
    engineRef.value.unmount()
  nextEngine.mount()
  engineRef.value = nextEngine
}, { immediate: true })

onBeforeUnmount(() => {
  engineRef.value?.unmount()
})
</script>

<template>
  <slot />
</template>
