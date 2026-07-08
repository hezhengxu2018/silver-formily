<script setup lang="ts">
import type { AlertDialogActionProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { AlertDialogAction } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../button'

const props = defineProps<AlertDialogActionProps & {
  class?: HTMLAttributes['class']
}>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
</script>

<template>
  <AlertDialogAction
    v-bind="delegatedProps"
    :class="cn(buttonVariants({ variant: 'destructive' }), props.class)"
  >
    <slot />
  </AlertDialogAction>
</template>
