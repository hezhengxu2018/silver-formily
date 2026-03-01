<script setup lang="ts">
import { Grid } from '@silver-formily/grid'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const containerRef = ref<HTMLElement | null>(null)
const templateColumns = ref('repeat(1,minmax(0,1fr))')
const gap = ref('8px 8px')

const items = [
  { title: 'A', span: 2 },
  { title: 'B', span: 1 },
  { title: 'C', span: 1 },
  { title: 'D', span: 3 },
  { title: 'E', span: 1 },
  { title: 'F', span: 2 },
]

let dispose: (() => void) | undefined

const grid = new Grid({
  minColumns: 2,
  maxColumns: 4,
  minWidth: 120,
  maxWidth: 220,
  columnGap: 12,
  rowGap: 12,
  onInitialized(current) {
    templateColumns.value = current.templateColumns
    gap.value = current.gap
  },
  onDigest(current) {
    templateColumns.value = current.templateColumns
    gap.value = current.gap
  },
})

onMounted(() => {
  if (!containerRef.value)
    return
  dispose = grid.connect(containerRef.value)
})

onBeforeUnmount(() => {
  dispose?.()
})
</script>

<template>
  <div>
    <div ref="containerRef" class="grid-board" :style="{ gridTemplateColumns: templateColumns, gap }">
      <div
        v-for="(item, index) in items"
        :key="item.title"
        class="grid-card"
        :data-grid-span="item.span"
      >
        <strong>{{ item.title }}</strong>
        <span>span {{ item.span }}</span>
        <small>#{{ index + 1 }}</small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-board {
  display: grid;
}

.grid-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 12px;
  background: var(--vp-c-bg-soft);
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>
