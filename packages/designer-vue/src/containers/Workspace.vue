<script setup lang="ts">
import { computed, provide, watch } from 'vue'
import { WorkspaceSymbol } from '../context'
import { useDesigner } from '../hooks'

const props = withDefaults(defineProps<{
  description?: string
  id?: string
  title?: string
}>(), {
  id: 'index',
})

const designerRef = useDesigner()

const workspaceProps = computed(() => ({
  description: props.description,
  id: props.id,
  title: props.title,
}))

provide(WorkspaceSymbol, workspaceProps)

watch(
  () => [designerRef.value, workspaceProps.value] as const,
  ([designer, props]) => {
    if (!designer)
      return

    const workspace = designer.workbench.ensureWorkspace(props)
    designer.workbench.setActiveWorkspace(workspace)
  },
  { immediate: true },
)
</script>

<template>
  <slot />
</template>
