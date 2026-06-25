<script setup lang="ts">
import type { PaletteResourceItem } from '../designer/useEditorDesigner'
import { makeDraggable } from '@vue-dnd-kit/core'
import { computed, useTemplateRef } from 'vue'
import { useEditorDesigner } from '../designer/useEditorDesigner'

const props = defineProps<{
  item: PaletteResourceItem
  itemClass: string
  iconClass: string
  iconSvgClass: string
  copyClass: string
  nameClass: string
}>()

const elementRef = useTemplateRef<HTMLElement>('element')
const { endPaletteDrag, startPaletteDrag, syncPaletteDrag } = useEditorDesigner()

const { isDragging } = makeDraggable(
  elementRef,
  {
    activation: {
      distance: 6,
    },
    data: () => ({
      sourceId: props.item.sourceId,
    }),
    events: {
      onSelfDragCancel: (event) => {
        endPaletteDrag(event.provider.pointer.value?.current)
      },
      onSelfDragEnd: (event) => {
        endPaletteDrag(event.provider.pointer.value?.current)
      },
      onSelfDragMove: (event) => {
        syncPaletteDrag(props.item.sourceId, event.provider.pointer.value?.current)
      },
      onSelfDragStart: (event) => {
        startPaletteDrag(props.item.sourceId, event.provider.pointer.value?.current)
      },
    },
    id: `palette-${props.item.sourceId}`,
  },
)

const style = computed(() => {
  if (!isDragging.value)
    return undefined

  return {
    opacity: '0.45',
  }
})
</script>

<template>
  <article
    ref="element"
    :class="itemClass"
    :style="style"
  >
    <div :class="iconClass">
      <span
        :class="iconSvgClass"
        v-html="item.iconSvg"
      />
    </div>
    <div :class="copyClass">
      <p :class="nameClass">
        {{ item.displayTitle }}
      </p>
    </div>
  </article>
</template>
