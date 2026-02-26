<script setup lang="ts">
import { Grid } from '@silver-formily/grid'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const containerRef = ref<HTMLElement | null>(null)
const ready = ref(false)
const hydrated = ref(false)
const templateColumns = ref('')
const gap = ref('8px 8px')

const items = Array.from({ length: 6 }, (_, index) => ({
  title: `Card ${index + 1}`,
  span: index % 3 === 0 ? 2 : 1,
}))

let dispose: (() => void) | undefined
let timer: ReturnType<typeof setTimeout> | undefined

const grid = new Grid({
  ssrColumns: 3,
  ssrTemplateColumns: 'repeat(3,minmax(0,1fr))',
  deferVisibilityUntilHydration: true,
  shouldVisible: node => node.index < 5,
  onInitialized(current) {
    ready.value = current.ready
    hydrated.value = current.hydrated
    templateColumns.value = current.templateColumns
    gap.value = current.gap
  },
  onDigest(current) {
    ready.value = current.ready
    hydrated.value = current.hydrated
    templateColumns.value = current.templateColumns
    gap.value = current.gap
  },
})

templateColumns.value = grid.templateColumns

afterHydrationSync()

function afterHydrationSync() {
  ready.value = grid.ready
  hydrated.value = grid.hydrated
}

onMounted(() => {
  timer = setTimeout(() => {
    if (!containerRef.value)
      return
    dispose = grid.connect(containerRef.value)
  }, 400)
})

onBeforeUnmount(() => {
  if (timer)
    clearTimeout(timer)
  dispose?.()
})
</script>

<template>
  <div>
    <p>
      <strong>ready:</strong> {{ ready }} |
      <strong>hydrated:</strong> {{ hydrated }} |
      <strong>templateColumns:</strong> {{ templateColumns }}
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
  border: 1px dashed var(--vp-c-divider);
  border-radius: 10px;
  padding: 12px;
  background: var(--vp-c-bg-soft);
}
</style>
