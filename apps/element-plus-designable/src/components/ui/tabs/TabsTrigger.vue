<script setup lang="ts">
import type { TabsTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { TabsTrigger } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<TabsTriggerProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <TabsTrigger
    data-slot="tabs-trigger"
    :class="cn(props.class)"
    :value="value"
    :disabled="disabled"
  >
    <slot />
  </TabsTrigger>
</template>
