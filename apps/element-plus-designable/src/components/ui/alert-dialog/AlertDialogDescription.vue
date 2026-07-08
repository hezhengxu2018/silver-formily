<script setup lang="ts">
import type { AlertDialogDescriptionProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { AlertDialogDescription } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<AlertDialogDescriptionProps & {
  class?: HTMLAttributes['class']
}>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
</script>

<template>
  <AlertDialogDescription
    v-bind="delegatedProps"
    :class="cn('text-muted-foreground text-sm', props.class)"
  >
    <slot />
  </AlertDialogDescription>
</template>
