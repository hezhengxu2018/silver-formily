<script setup lang="ts">
import { createNamespace } from '@/lib/utils'

const { prefixCls, b } = createNamespace('editor-canvas')
</script>

<template>
  <section :class="prefixCls">
    <div :class="b('form')" />
  </section>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-editor-canvas {
  @apply flex w-full items-center justify-center;

  &__form {
    @apply relative mx-auto w-full rounded-lg border bg-white;
    width: min(100%, 42rem);
    min-height: 40rem;
    box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
  }
}
</style>
