<script setup lang="ts">
import { Grid } from '@silver-formily/grid'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const containerRef = ref<HTMLElement | null>(null)
const hideEven = ref(true)
const hydrated = ref(false)
const visibleCount = ref(0)
const templateColumns = ref('repeat(2,minmax(0,1fr))')

let dispose: (() => void) | undefined

const items = Array.from({ length: 8 }, (_, index) => ({
  title: `Node ${index + 1}`,
  span: 1,
}))

const createVisibleRule = () => (node: { index: number }) => (hideEven.value ? node.index % 2 === 1 : true)

const grid = new Grid({
  ssrWidth: 960,
  minColumns: 2,
  maxColumns: 2,
  shouldVisible: createVisibleRule(),
  onDigest(current) {
    hydrated.value = current.hydrated
    visibleCount.value = current.children.filter(node => node.visible).length
    templateColumns.value = current.templateColumns
  },
})

watch(hideEven, () => {
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
      <label><input v-model="hideEven" type="checkbox"> hideEven</label>
    </p>
    <p>
      hydrated={{ hydrated }}, visible={{ visibleCount }}/8
    </p>
    <div ref="containerRef" class="grid-board" :style="{ gridTemplateColumns: templateColumns, gap: '10px' }">
      <div v-for="item in items" :key="item.title" class="grid-card" data-grid-span="1">
        {{ item.title }}
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
