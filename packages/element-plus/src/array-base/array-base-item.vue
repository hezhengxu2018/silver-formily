<script lang="ts" setup>
import type { IArrayBaseItemProps } from './types'
import { provide } from 'vue'
import { ItemSymbol } from './symbols'

defineOptions({
  name: 'ArrayBaseItem',
})

const props = defineProps<IArrayBaseItemProps>()

provide(ItemSymbol, props)
</script>

<template>
  <slot />
</template>
