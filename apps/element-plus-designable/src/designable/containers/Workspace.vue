<script setup lang="ts">
import { computed, provide } from 'vue'
import { WorkspaceSymbol } from '../context'
import { useDesigner } from '../hooks'
import { reactiveWatchEffect } from '../shared/reactive'

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

reactiveWatchEffect(() => {
  const designer = designerRef.value
  if (!designer)
    return

  const workspace = designer.workbench.ensureWorkspace(workspaceProps.value)
  designer.workbench.setActiveWorkspace(workspace)
})
</script>

<template>
  <slot />
</template>
