<script setup lang="ts">
import type { TabsContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { TabsContent } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<TabsContentProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <TabsContent
    data-slot="tabs-content"
    :class="cn(props.class)"
    :value="value"
    :force-mount="forceMount"
  >
    <slot />
  </TabsContent>
</template>
