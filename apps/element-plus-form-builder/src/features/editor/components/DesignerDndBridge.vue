<script setup lang="ts">
import { useDnDProvider } from '@vue-dnd-kit/core'
import { watch } from 'vue'
import { useEditorDesigner } from '../designer/useEditorDesigner'

const provider = useDnDProvider()
const { endPaletteDrag, movePaletteDrag } = useEditorDesigner()

watch(
  () => [
    provider.state.value,
    provider.pointer.value?.current?.x ?? null,
    provider.pointer.value?.current?.y ?? null,
  ] as const,
  ([state, x, y]) => {
    if (state !== 'dragging' || x === null || y === null)
      return
    movePaletteDrag({ x, y })
  },
)

watch(
  () => provider.state.value,
  (state, previous) => {
    if (
      previous === 'dragging'
      && state !== 'dragging'
      && state !== 'pending'
    ) {
      endPaletteDrag(provider.pointer.value?.current)
    }
  },
)
</script>

<template>
  <slot />
</template>
