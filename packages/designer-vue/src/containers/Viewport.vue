<script setup lang="ts">
import { useObserver } from '@silver-formily/reactive-vue'
import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import { useWorkspace } from '../hooks'
import AuxToolWidget from '../widgets/AuxToolWidget.vue'

useObserver()

const workspaceRef = useWorkspace()
const viewportElementRef = ref<HTMLElement | null>(null)
const mountedWorkspaceRef = shallowRef<typeof workspaceRef.value>(null)

onMounted(() => {
  const workspace = workspaceRef.value
  const viewportElement = viewportElementRef.value
  if (!workspace || !viewportElement)
    return

  if (mountedWorkspaceRef.value && mountedWorkspaceRef.value !== workspace)
    mountedWorkspaceRef.value.viewport.onUnmount()

  workspace.viewport.onMount(viewportElement, window)
  mountedWorkspaceRef.value = workspace
})

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
@reference "../styles/globals.css";

.dn-viewport {
  @apply relative h-full overflow-auto;
}
</style>
