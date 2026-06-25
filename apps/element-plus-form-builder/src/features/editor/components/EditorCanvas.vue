<script setup lang="ts">
import { useObserver } from '@silver-formily/reactive-vue'
import { makeDroppable } from '@vue-dnd-kit/core'
import { onMounted, useTemplateRef } from 'vue'
import { createNamespace } from '@/lib/utils'
import { useEditorDesigner } from '../designer/useEditorDesigner'
import DesignerCanvasNode from './DesignerCanvasNode.vue'

useObserver()

const viewportRef = useTemplateRef<HTMLElement>('viewport')
const { prefixCls, b } = createNamespace('editor-canvas')
const { endPaletteDrag, getRootNode, mountViewport, movePaletteDrag } = useEditorDesigner()

const { isDragOver } = makeDroppable(
  viewportRef,
  {
    data: () => ({
      nodeId: getRootNode().id,
    }),
    events: {
      onDrop: (event) => {
        endPaletteDrag(event.provider.pointer.value?.current)
        return true
      },
      onEnter: (event) => {
        movePaletteDrag(event.provider.pointer.value?.current)
      },
    },
  },
  () => getRootNode().children,
)

onMounted(() => {
  if (viewportRef.value) {
    mountViewport(viewportRef.value)
  }
})
</script>

<template>
  <section :class="prefixCls">
    <div :class="b('container')">
      <div
        ref="viewport"
        :class="b('wrapper', { dragOver: !!isDragOver })"
      >
        <DesignerCanvasNode
          :node="getRootNode()"
          root
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-editor-canvas {
  @apply absolute inset-0 overflow-y-auto px-16;

  &__container {
    @apply mx-auto my-8 flex w-full flex-col items-center transition-all duration-300;
  }

  &__wrapper {
    @apply relative mx-auto w-full rounded-lg bg-white p-10 text-gray-900 transition-all;
    width: min(100%, 42rem);
    min-height: 40rem;
    box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
  }

  &__wrapper--drag-over {
    @apply ring-2 ring-blue-300/70;
  }
}
</style>
