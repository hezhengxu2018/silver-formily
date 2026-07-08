<script setup lang="ts">
import type { AlertDialogCancelProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { AlertDialogCancel } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../button'

const props = defineProps<AlertDialogCancelProps & {
  class?: HTMLAttributes['class']
}>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
</script>

<template>
  <AlertDialogCancel
    v-bind="delegatedProps"
    :class="cn(buttonVariants({ variant: 'outline' }), props.class)"
  >
    <slot />
  </AlertDialogCancel>
</template>
