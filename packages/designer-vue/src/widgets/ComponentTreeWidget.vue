<script setup lang="ts">
import type { Component } from 'vue'
import { useObserver } from '@silver-formily/reactive-vue'
import { provide, toRef } from 'vue'
import { DesignerComponentsSymbol } from '../context'
import { useTree } from '../hooks'
import TreeNodeWidget from './TreeNodeWidget'

const props = withDefaults(defineProps<{
  components?: Record<string, Component>
}>(), {
  components: () => ({}),
})

const treeRef = useTree()

useObserver()
provide(DesignerComponentsSymbol, toRef(props, 'components'))
</script>

<template>
  <div class="dn-component-tree">
    <TreeNodeWidget
      v-if="treeRef"
      :node="treeRef"
    />
  </div>
</template>

<style scoped>
@reference "../styles/globals.css";

.dn-component-tree {
  @apply relative mx-auto my-8 w-full rounded-lg bg-white p-10 text-slate-900 transition-all duration-150;

  max-width: calc(432px + 5rem);
  box-shadow: 0 0 20px 0 rgb(0 0 0 / 8%);

  & > * {
    @apply h-full;
  }
}
</style>
