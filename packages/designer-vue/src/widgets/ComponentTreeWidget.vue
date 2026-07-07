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
  @apply mx-auto my-8 bg-white/90 p-8 pb-24;
  border-radius: 20px;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
  box-sizing: border-box;
  display: block;
  min-height: 432px;
  min-width: 100%;
  width: min(100%, 800px);

  > * {
    min-height: 100%;
    min-width: 100%;
  }
}
</style>
