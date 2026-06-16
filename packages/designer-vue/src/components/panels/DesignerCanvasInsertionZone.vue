<script setup lang="ts">
import type { DesignerNode } from '@silver-formily/designer-core'
import type { IDragEvent } from '@vue-dnd-kit/core'

import { makeDroppable } from '@vue-dnd-kit/core'
import { useTemplateRef } from 'vue'

import { isDesignerMaterialDragSession } from '../../shared/dnd'

const props = defineProps<{
  node: DesignerNode
  containerName: string
  index: number
}>()

const emit = defineEmits<{
  activate: [payload: { containerName: string, index: number }]
  deactivate: [payload: { containerName: string, index: number }]
  dropMaterial: [payload: { containerName: string, index: number, materialName: string }]
}>()

const zoneRef = useTemplateRef<HTMLElement>('zone')

function resolveMaterial(event: IDragEvent) {
  const material = event.draggedItems[0]?.data
  if (!isDesignerMaterialDragSession(material))
    return

  if (!props.node.canAcceptChild(material.componentName, props.containerName))
    return

  return material
}

makeDroppable(zoneRef, {
  data: () => ({
    containerName: props.containerName,
    index: props.index,
  }),
  events: {
    onEnter(event) {
      if (!resolveMaterial(event))
        return
      emit('activate', {
        containerName: props.containerName,
        index: props.index,
      })
    },
    onLeave() {
      emit('deactivate', {
        containerName: props.containerName,
        index: props.index,
      })
    },
    onDrop(event) {
      const material = resolveMaterial(event)
      if (!material)
        return false

      emit('dropMaterial', {
        containerName: props.containerName,
        index: props.index,
        materialName: material.materialName,
      })
      return true
    },
  },
})
</script>

<template>
  <button ref="zone" type="button">
    <slot />
  </button>
</template>
