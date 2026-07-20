<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    role="group"
    data-slot="field"
    :class="cn(
      'group/field flex w-full items-center gap-3 data-[invalid=true]:text-destructive',
      '*:data-[slot=field-label]:flex-auto',
      'has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
