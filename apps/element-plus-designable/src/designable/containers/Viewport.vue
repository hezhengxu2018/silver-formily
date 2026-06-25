<script setup lang="ts">
import { useObserver } from '@silver-formily/reactive-vue'
import { onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { useWorkspace } from '../hooks'
import AuxToolWidget from '../widgets/AuxToolWidget.vue'

useObserver()

const workspaceRef = useWorkspace()
const viewportElementRef = ref<HTMLElement | null>(null)
const mountedWorkspaceRef = shallowRef<typeof workspaceRef.value>(null)

watch(
  [workspaceRef, viewportElementRef],
  ([workspace, viewportElement]) => {
    if (!workspace || !viewportElement)
      return

    if (mountedWorkspaceRef.value === workspace)
      return

    mountedWorkspaceRef.value?.viewport.onUnmount()
    workspace.viewport.onMount(viewportElement, window)
    mountedWorkspaceRef.value = workspace
  },
  { flush: 'post', immediate: true },
)

onBeforeUnmount(() => {
  mountedWorkspaceRef.value?.viewport.onUnmount()
  mountedWorkspaceRef.value = null
})
</script>

<template>
  <div
    ref="viewportElementRef"
    class="dn-viewport"
  >
    <slot />
    <AuxToolWidget />
  </div>
</template>

<style scoped>
@reference "../../styles/globals.css";

.dn-viewport {
  @apply relative h-full overflow-auto;
}
</style>
