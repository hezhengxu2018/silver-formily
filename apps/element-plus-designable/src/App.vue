<script setup lang="ts">
import { TooltipProvider } from '@/components/ui/tooltip'
import EditorShell from './features/editor/components/EditorShell.vue'
</script>

<template>
  <TooltipProvider :delay-duration="180">
    <EditorShell />
  </TooltipProvider>
</template>
