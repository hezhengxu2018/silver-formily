<script setup lang="ts">
import { useObserver } from '@silver-formily/reactive-vue'
import { makeDroppable } from '@vue-dnd-kit/core'
import { onMounted, useTemplateRef } from 'vue'
import { createNamespace } from '@/lib/utils'
import { useEditorDesigner } from '../designer/useEditorDesigner'
import DesignerCanvasNode from './DesignerCanvasNode.vue'
import DesignerSelectionOverlay from './DesignerSelectionOverlay.vue'

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
        class="dn-viewport"
        :class="b('wrapper', { dragOver: !!isDragOver })"
      >
        <div class="dn-component-tree">
          <DesignerCanvasNode
            :node="getRootNode()"
            root
          />
        </div>
        <DesignerSelectionOverlay :viewport="viewportRef ?? null" />
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-editor-canvas {
  @apply absolute inset-0 overflow-y-auto px-16;
  background:
    radial-gradient(circle at top left, rgba(191, 219, 254, 0.55), transparent 28%),
    linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%);

  &__container {
    @apply mx-auto my-8 flex w-full flex-col items-center transition-all duration-300;
  }

  &__wrapper {
    @apply relative mx-auto w-full rounded-[1.75rem] bg-white/88 p-6 text-gray-900 transition-all;
    width: min(100%, 50rem);
    min-height: 42rem;
    box-shadow:
      0 24px 60px rgba(15, 23, 42, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
  }

  &__wrapper--drag-over {
    @apply ring-2 ring-blue-300/70;
  }
}

.dn-viewport {
  @apply relative;
}

.dn-component-tree {
  @apply grid gap-2;
}
</style>
