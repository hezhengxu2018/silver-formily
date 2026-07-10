<script setup lang="ts">
import { createNamespace } from '@/lib/utils'

const { prefixCls } = createNamespace('schema-preview')
</script>

<template>
  <aside :class="prefixCls" />
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-schema-preview {
  @apply border-slate-200 bg-white;

  border-left-width: 1px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  width: 384px;
}
</style>
