<script setup lang="ts">
import type { NumberFieldIncrementProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Plus } from '@lucide/vue'
import { NumberFieldIncrement } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<NumberFieldIncrementProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <NumberFieldIncrement
    :class="cn('absolute right-1 z-10 flex size-7 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-40', props.class)"
  >
    <Plus class="size-3" />
  </NumberFieldIncrement>
</template>
