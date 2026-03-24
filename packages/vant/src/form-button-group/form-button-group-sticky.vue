<script setup lang="ts">
import { stickyProps, Sticky as VanSticky } from 'vant'
import { computed } from 'vue'
import { useVantFormRoot } from '../form/hooks'

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
</script>

<template>
  <VanSticky
    class="silver-formily-vant-form-button-group__sticky"
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

<style scoped>
.silver-formily-vant-form-button-group__sticky:deep(.van-sticky--fixed) {
  background: var(--van-background-2);
}
</style>
