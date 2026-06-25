<script setup lang="ts">
import { useObserver } from '@silver-formily/reactive-vue'
import { onBeforeUnmount, ref, watch } from 'vue'
import { useDesigner } from '../hooks'
import DragPreview from './DragPreview.vue'
import Insertion from './Insertion.vue'
import Selection from './Selection.vue'

useObserver()

const designerRef = useDesigner()
const renderTick = ref(0)
const refreshEvents = new Set([
  'append:node',
  'drag:move',
  'drop:node',
  'insert:after',
  'insert:before',
  'insert:children',
  'prepend:node',
  'remove:node',
  'select:node',
  'unselect:node',
  'update:children',
  'update:node:props',
  'wrap:node',
])

let disposeEngineEvents: (() => void) | undefined

watch(
  designerRef,
  (designer) => {
    disposeEngineEvents?.()
    disposeEngineEvents = undefined

    if (!designer)
      return

    disposeEngineEvents = designer.subscribe((event) => {
      if (refreshEvents.has(event.type))
        renderTick.value += 1
    })
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  disposeEngineEvents?.()
})
</script>

<template>
  <div class="dn-auxtool">
    <Insertion :key="`insertion-${renderTick}`" />
    <Selection :key="`selection-${renderTick}`" />
    <DragPreview :key="`preview-${renderTick}`" />
  </div>
</template>

<style scoped>
@reference "../../styles/globals.css";

.dn-auxtool {
  @apply pointer-events-none absolute left-0 top-0 z-20 h-full w-full;
  transform: perspective(1px) translate3d(0, 0, 0);
}
</style>
