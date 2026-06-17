<script setup lang="ts">
import { ChevronRight, GripVertical } from '@lucide/vue'

import { ScrollArea } from '@/components/ui/scroll-area'
import { structureNodes } from '../mockData'
</script>

<template>
  <ScrollArea class="h-[calc(100vh-12rem)] min-h-96 pr-3">
    <ol class="grid gap-2 py-2">
      <li
        v-for="(node, index) in structureNodes"
        :key="node.name"
        class="flex items-center gap-3 rounded-md border bg-card px-3 py-2"
        :class="index === 0 ? 'border-primary/35 bg-primary/5' : ''"
      >
        <ChevronRight class="size-4 shrink-0 text-muted-foreground" />
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium">
            {{ node.name }}
          </p>
          <p class="text-xs text-muted-foreground">
            {{ node.type }}
          </p>
        </div>
        <GripVertical class="size-4 shrink-0 text-muted-foreground" />
      </li>
    </ol>
  </ScrollArea>
</template>
