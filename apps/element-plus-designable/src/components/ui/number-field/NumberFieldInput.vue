<script setup lang="ts">
import type { NumberFieldInputProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { NumberFieldInput } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<NumberFieldInputProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <NumberFieldInput
    :class="cn('border-input bg-white ring-offset-background placeholder:text-muted-foreground flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]', props.class)"
  />
</template>
