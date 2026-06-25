<script setup lang="ts">
import type { Workspace } from '@silver-formily/designer-core'
import { computed, provide, shallowRef, watchEffect } from 'vue'
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
const workspaceRef = shallowRef<Workspace | null>(null)

const workspaceProps = computed(() => ({
  description: props.description,
  id: props.id,
  title: props.title,
}))

provide(WorkspaceSymbol, workspaceRef)

watchEffect(() => {
  const designer = designerRef.value
  if (!designer)
    return
  workspaceRef.value = designer.workbench.ensureWorkspace(workspaceProps.value)
  designer.workbench.setActiveWorkspace(workspaceRef.value)
})
</script>

<template>
  <slot />
</template>
