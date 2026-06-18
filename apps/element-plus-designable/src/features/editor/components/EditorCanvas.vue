<script setup lang="ts">
import { createNamespace } from '@/lib/utils'

const { prefixCls, b } = createNamespace('editor-canvas')
</script>

<template>
  <section :class="prefixCls">
    <div :class="b('container')">
      <div :class="b('wrapper')" />
    </div>
  </section>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-editor-canvas {
  @apply absolute inset-0 overflow-y-auto px-16;

  &__container {
    @apply mx-auto my-8 flex w-full flex-col items-center transition-all duration-300;
  }

  &__wrapper {
    @apply relative mx-auto w-full rounded-lg bg-white p-10 text-gray-900 transition-all;
    width: min(100%, 42rem);
    min-height: 40rem;
    box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
  }
}
</style>
