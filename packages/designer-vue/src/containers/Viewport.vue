<script setup lang="ts">
import { useObserver } from '@silver-formily/reactive-vue'
import { nextTick, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import { useSelection, useTree, useWorkspace } from '../hooks'
import AuxToolWidget from '../widgets/AuxToolWidget.vue'

withDefaults(defineProps<{
  showAuxTool?: boolean
}>(), {
  showAuxTool: true,
})

useObserver()

const workspaceRef = useWorkspace()
const selectionRef = useSelection()
const treeRef = useTree()
const viewportElementRef = ref<HTMLElement | null>(null)
const mountedWorkspaceRef = shallowRef<typeof workspaceRef.value>(null)

function shouldAllowNativeInteraction(event: Event) {
  const target = event.target
  if (!(target instanceof Element))
    return false

  const engine = workspaceRef.value?.engine
  if (!engine)
    return false

  const helperAttrName = engine.props.nodeSelectionIdAttrName
  const contentEditableAttrName = engine.props.contentEditableAttrName
  const clickStopPropagationAttrName = engine.props.clickStopPropagationAttrName

  return !!(
    target.closest(`[${helperAttrName}]`)
    || target.closest(`[${contentEditableAttrName}]`)
    || target.closest(`[${clickStopPropagationAttrName}]`)
  )
}

function preventRuntimeInteraction(event: Event) {
  if (shouldAllowNativeInteraction(event))
    return
  event.preventDefault()
}

onMounted(() => {
  const workspace = workspaceRef.value
  const viewportElement = viewportElementRef.value
  if (!workspace || !viewportElement)
    return

  if (mountedWorkspaceRef.value && mountedWorkspaceRef.value !== workspace)
    mountedWorkspaceRef.value.viewport.onUnmount()

  workspace.viewport.onMount(viewportElement, window)
  mountedWorkspaceRef.value = workspace

  nextTick(() => {
    selectionRef.value?.clear()
    nextTick(() => {
      if (treeRef.value)
        selectionRef.value?.select(treeRef.value)
    })
  })
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
    @click.capture="preventRuntimeInteraction"
    @dragstart.capture="preventRuntimeInteraction"
    @mousedown.capture="preventRuntimeInteraction"
  >
    <slot />
    <AuxToolWidget v-if="showAuxTool" />
  </div>
</template>

<style scoped>
@reference "../styles/globals.css";

.dn-viewport {
  @apply absolute inset-0 mx-auto flex w-full flex-col items-center overflow-y-auto px-16 transition-all duration-300;
}
</style>
