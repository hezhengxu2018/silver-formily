<script setup lang="ts">
import { useObserver } from '@silver-formily/reactive-vue'
import Hover from './Hover.vue'
import Insertion from './Insertion.vue'
import Selection from './Selection.vue'

useObserver()
</script>

<template>
  <div class="dn-auxtool">
    <Hover />
    <Insertion />
    <Selection />
  </div>
</template>

<style scoped>
@reference "../styles/globals.css";

.dn-auxtool {
  height: 100%;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  transform: perspective(1px) translate3d(0, 0, 0);
  width: 100%;
  z-index: 20;
}
</style>
