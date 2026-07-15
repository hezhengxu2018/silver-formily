<script setup lang="ts">
import type { VNode } from 'vue'
import { isVNode } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({
  name: 'FormilyShadcnFormItem',
})

defineProps<{
  asterisk?: boolean
  description?: string | VNode
  feedbackStatus?: 'error' | 'success' | 'warning' | 'pending'
  feedbackText?: string
  label?: string | VNode
  required?: boolean
}>()
</script>

<template>
  <div
    :class="cn(
      'grid gap-2',
      feedbackStatus === 'error' && '[&_[data-slot=input]]:border-destructive [&_[data-slot=input]]:ring-destructive/20',
    )"
    :data-invalid="feedbackStatus === 'error' ? '' : undefined"
  >
    <div
      v-if="label"
      class="flex items-center gap-1 text-sm font-medium leading-none"
    >
      <template v-if="isVNode(label)">
        <component :is="label" />
      </template>
      <template v-else>
        {{ label }}
      </template>
      <span
        v-if="asterisk ?? required"
        aria-hidden="true"
        class="text-destructive"
      >*</span>
    </div>

    <slot />

    <div
      v-if="description"
      class="text-muted-foreground text-xs"
    >
      <template v-if="isVNode(description)">
        <component :is="description" />
      </template>
      <template v-else>
        {{ description }}
      </template>
    </div>

    <div
      v-if="feedbackText"
      :class="cn(
        'text-xs',
        feedbackStatus === 'error' ? 'text-destructive' : 'text-muted-foreground',
      )"
    >
      {{ feedbackText }}
    </div>
  </div>
</template>
