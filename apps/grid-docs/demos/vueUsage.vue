<script setup lang="ts">
import type { GridNode } from '@silver-formily/grid'
import { Grid } from '@silver-formily/grid'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const containerRef = ref<HTMLElement | null>(null)
const compactMode = ref(false)
const hideSpan2 = ref(false)
const visibleCount = ref(0)
const templateColumns = ref('repeat(2,minmax(0,1fr))')
const gap = ref('10px 10px')

const items = [
  { title: 'Alpha', span: 2 },
  { title: 'Beta', span: 1 },
  { title: 'Gamma', span: 1 },
  { title: 'Delta', span: 2 },
  { title: 'Epsilon', span: 1 },
  { title: 'Zeta', span: 1 },
]

let dispose: (() => void) | undefined

const createVisibleRule = () => (node: GridNode) => (hideSpan2.value ? node.originSpan !== 2 : true)

const grid = new Grid({
  minColumns: 2,
  maxColumns: 4,
  minWidth: 140,
  maxWidth: 260,
  columnGap: 10,
  rowGap: 10,
  shouldVisible: createVisibleRule(),
  onDigest(current) {
    templateColumns.value = current.templateColumns
    gap.value = current.gap
    visibleCount.value = current.children.filter(node => node.visible).length
  },
})

watch(compactMode, (enabled) => {
  grid.options.columnGap = enabled ? 6 : 10
  grid.options.rowGap = enabled ? 6 : 10
  grid.options.maxWidth = enabled ? 220 : 260
})

watch(hideSpan2, () => {
  grid.options.shouldVisible = createVisibleRule()
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
    <p>
      <label><input v-model="compactMode" type="checkbox"> compactMode</label>
      <label style="margin-left: 12px;"><input v-model="hideSpan2" type="checkbox"> hide span=2</label>
    </p>
    <p>
      visible={{ visibleCount }}/{{ items.length }}
    </p>
    <div ref="containerRef" class="grid-board" :style="{ gridTemplateColumns: templateColumns, gap }">
      <div
        v-for="item in items"
        :key="item.title"
        class="grid-card"
        :data-grid-span="item.span"
      >
        <strong>{{ item.title }}</strong>
        <span>span {{ item.span }}</span>
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
  padding: 10px;
  background: var(--vp-c-bg-soft);
}
</style>
