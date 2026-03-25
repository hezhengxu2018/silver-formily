<script setup lang="ts">
import { stickyProps, Sticky as VanSticky } from 'vant'
import { computed } from 'vue'
import { useVantFormRoot } from '../form/hooks'
import { b } from './utils'

defineOptions({
  name: 'FFormButtonGroupSticky',
  inheritAttrs: false,
})

const props = defineProps({
  ...stickyProps,
  position: {
    ...stickyProps.position,
    default: 'bottom',
  },
})

const formRootRef = useVantFormRoot()
const resolvedContainer = computed(() => props.container ?? formRootRef?.value)
const stickyClass = b('sticky')
</script>

<template>
  <VanSticky
    :class="stickyClass"
    v-bind="$attrs"
    :container="resolvedContainer"
    :offset-bottom="props.offsetBottom"
    :offset-top="props.offsetTop"
    :position="props.position"
    :z-index="props.zIndex"
  >
    <slot />
  </VanSticky>
</template>
