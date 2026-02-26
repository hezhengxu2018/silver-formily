<script setup lang="ts">
import { Grid } from '@silver-formily/grid'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const containerRef = ref<HTMLElement | null>(null)
const deferVisibility = ref(true)
const hideEven = ref(true)
const hydrated = ref(false)
const visibleCount = ref(0)
const templateColumns = ref('repeat(2,minmax(0,1fr))')

let dispose: (() => void) | undefined

const items = Array.from({ length: 8 }, (_, index) => ({
  title: `Node ${index + 1}`,
  span: 1,
}))

const status = computed(() => ({
  deferVisibility: deferVisibility.value,
  hideEven: hideEven.value,
  hydrated: hydrated.value,
  visibleCount: visibleCount.value,
}))

const grid = new Grid({
  ssrColumns: 2,
  deferVisibilityUntilHydration: deferVisibility.value,
  shouldVisible: node => hideEven.value ? node.index % 2 === 1 : true,
  onDigest(current) {
    hydrated.value = current.hydrated
    visibleCount.value = current.children.filter(node => node.visible).length
    templateColumns.value = current.templateColumns
  },
})

watch(deferVisibility, (value) => {
  grid.options.deferVisibilityUntilHydration = value
})

watch(hideEven, () => {
  grid.options.shouldVisible = node => hideEven.value ? node.index % 2 === 1 : true
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
      <label><input v-model="deferVisibility" type="checkbox"> deferVisibilityUntilHydration</label>
      <label style="margin-left: 12px;"><input v-model="hideEven" type="checkbox"> hideEven</label>
    </p>
    <p>
      hydrated={{ status.hydrated }}, visible={{ status.visibleCount }}/8
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
