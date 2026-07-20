<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { TabsList } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <TabsList
    data-slot="tabs-list"
    :class="cn(props.class)"
  >
    <slot />
  </TabsList>
</template>
