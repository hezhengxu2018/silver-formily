<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({
  name: 'FormilyShadcnTextArea',
  inheritAttrs: false,
})

defineProps<{
  class?: HTMLAttributes['class']
}>()

const modelValue = defineModel<string | number>()
</script>

<template>
  <textarea
    v-model="modelValue"
    data-slot="input"
    :class="cn('border-input bg-background ring-offset-background placeholder:text-muted-foreground flex min-h-16 w-full min-w-0 rounded-md border px-3 py-2 text-sm shadow-xs transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]', $props.class)"
  />
</template>
