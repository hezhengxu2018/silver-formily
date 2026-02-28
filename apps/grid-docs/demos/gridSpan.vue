<script setup lang="ts">
import { Grid } from '@silver-formily/grid'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const containerRef = ref<HTMLElement | null>(null)
const useAutoFill = ref(true)
const templateColumns = ref('repeat(4,minmax(0,1fr))')
const gap = ref('8px 8px')
const columns = ref(4)

const items = computed(() => [
  { key: 'name', label: 'Name', span: 1 },
  { key: 'email', label: 'Email', span: 1 },
  {
    key: 'actions',
    label: 'Actions',
    span: useAutoFill.value ? -1 : 1,
    accent: true,
  },
  { key: 'phone', label: 'Phone', span: 1 },
  { key: 'company', label: 'Company', span: 2 },
  { key: 'city', label: 'City', span: 1 },
  { key: 'zip', label: 'Zip', span: 1 },
])

let dispose: (() => void) | undefined

const grid = new Grid({
  minColumns: 4,
  maxColumns: 4,
  minWidth: 70,
  maxWidth: 160,
  columnGap: 8,
  rowGap: 8,
  onDigest(current) {
    templateColumns.value = current.templateColumns
    gap.value = current.gap
    columns.value = current.columns
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
    <p>
      <label><input v-model="useAutoFill" type="checkbox"> Use <code>data-grid-span="-1"</code> for Actions</label>
    </p>
    <p>
      columns={{ columns }} / Actions span={{ useAutoFill ? -1 : 1 }}
    </p>
    <div ref="containerRef" class="grid-board" :style="{ gridTemplateColumns: templateColumns, gap }">
      <div
        v-for="item in items"
        :key="item.key"
        class="grid-card"
        :class="{ accent: item.accent }"
        :data-grid-span="item.span"
      >
        <strong>{{ item.label }}</strong>
        <span>data-grid-span={{ item.span }}</span>
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
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.grid-card.accent {
  border-color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 12%, var(--vp-c-bg-soft));
}
</style>
