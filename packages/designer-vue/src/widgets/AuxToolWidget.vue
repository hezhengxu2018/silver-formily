<script setup lang="ts">
import { useObserver } from '@silver-formily/reactive-vue'
import DragPreview from './DragPreview.vue'
import Insertion from './Insertion.vue'
import Selection from './Selection.vue'

useObserver()
</script>

<template>
  <div class="dn-auxtool">
    <Insertion />
    <Selection />
    <DragPreview />
  </div>
</template>

<style scoped>
@reference "../styles/globals.css";

.dn-auxtool {
  @apply pointer-events-none absolute left-0 top-0 z-20 h-full w-full;
  transform: perspective(1px) translate3d(0, 0, 0);
}
</style>
