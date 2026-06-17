<script setup lang="ts">
import { FileJson } from '@lucide/vue'

import { ScrollArea } from '@/components/ui/scroll-area'
import { schemaPreview } from '../mockData'
</script>

<template>
  <ScrollArea class="h-[calc(100vh-12rem)] min-h-96 rounded-md border bg-muted/35">
    <pre class="overflow-x-auto p-4 text-xs leading-5 text-foreground">{{ schemaPreview }}</pre>
  </ScrollArea>
  <div class="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
    <FileJson class="size-4" />
    Static schema sample only
  </div>
</template>
