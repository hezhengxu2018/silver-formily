<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  orientation?: 'horizontal' | 'vertical'
  class?: HTMLAttributes['class']
}>(), {
  orientation: 'horizontal',
})
</script>

<template>
  <div
    role="separator"
    :aria-orientation="orientation"
    :class="cn('shrink-0 bg-border', orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px', props.class)"
  />
</template>
