<script setup lang="ts">
import type { Component } from 'vue'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export interface TemplateAction {
  icon: Component
  onClick: () => void
  title: string
}

withDefaults(defineProps<{
  actions?: TemplateAction[]
}>(), {
  actions: () => [],
})

const ShadcnButton = Button as any
</script>

<template>
  <TooltipProvider :delay-duration="100">
    <div class="dn-load-template">
      <Tooltip
        v-for="action in actions"
        :key="action.title"
      >
        <TooltipTrigger as-child>
          <ShadcnButton
            :aria-label="action.title"
            class="dn-load-template-action"
            size="icon"
            variant="outline"
            @click.stop="action.onClick"
            @mousedown.stop
          >
            <component :is="action.icon" />
          </ShadcnButton>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {{ action.title }}
        </TooltipContent>
      </Tooltip>
    </div>
  </TooltipProvider>
</template>
