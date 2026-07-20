<script setup lang="ts">
import type { NumberFieldDecrementProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Minus } from '@lucide/vue'
import { NumberFieldDecrement } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<NumberFieldDecrementProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <NumberFieldDecrement
    :class="cn('absolute right-8 flex size-7 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-40', props.class)"
  >
    <Minus class="size-3" />
  </NumberFieldDecrement>
</template>
