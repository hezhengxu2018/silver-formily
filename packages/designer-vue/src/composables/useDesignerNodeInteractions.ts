import type { DesignerNode } from '@silver-formily/designer-core'
import type { MaybeRefOrGetter } from 'vue'

import { computed, ref, toValue } from 'vue'

import { useDesigner, useDesignerCommands, useDesignerDrag } from './useDesigner'

function getNodeValue(node: MaybeRefOrGetter<DesignerNode>) {
  return toValue(node)
}

export function useDesignerNodeInteractions(node: MaybeRefOrGetter<DesignerNode>) {
  const context = useDesigner()
  const { hoverNode, selectNode } = useDesignerCommands()
  const { dragSession, startNodeDrag, clearDragSession } = useDesignerDrag()
  const activeContainerName = ref<string>()
  const activeInsertionKey = ref<string>()

  const currentNode = computed(() => getNodeValue(node))
  const isSelected = computed(() => context.snapshot.value.selectedId === currentNode.value.id)
  const isHovered = computed(() => context.snapshot.value.hoveredId === currentNode.value.id)
  const containerEntries = computed(() => {
    return currentNode.value.availableContainers.map((container) => {
      const nodes = container.name === 'children'
        ? currentNode.value.children
        : (currentNode.value.slots[container.name] || [])

      return {
        ...container,
        label: container.title || (container.name === 'children' ? 'Children' : container.name),
        nodes,
      }
    })
  })

  const draggedMaterialName = computed(() => dragSession.value?.type === 'material' ? dragSession.value.materialName : undefined)
  const draggedNodeId = computed(() => dragSession.value?.type === 'node' ? dragSession.value.nodeId : undefined)
  const draggedComponentName = computed(() => dragSession.value?.componentName)
  const canDragNode = computed(() => !currentNode.value.isRoot)
  const isDraggingSelf = computed(() => dragSession.value?.type === 'node' && draggedNodeId.value === currentNode.value.id)

  function handleSelect() {
    selectNode(currentNode.value.id)
  }

  function handleHoverEnter() {
    if (dragSession.value)
      return
    hoverNode(currentNode.value.id)
  }

  function handleHoverLeave() {
    if (dragSession.value)
      return
    if (context.snapshot.value.hoveredId === currentNode.value.id)
      hoverNode(undefined)
  }

  function canDropInto(containerName: string) {
    if (!dragSession.value || !draggedComponentName.value)
      return false

    if (dragSession.value.type === 'node') {
      const draggedNode = context.designer.value.tree.getNode(draggedNodeId.value)
      if (!draggedNode)
        return false
      if (draggedNode.id === currentNode.value.id || draggedNode.contains(currentNode.value.id))
        return false
    }

    return currentNode.value.canAcceptChild(draggedComponentName.value, containerName)
  }

  function getInsertionKey(containerName: string, index: number) {
    return `${containerName}:${index}`
  }

  function hasInsertionGuides(containerName: string) {
    return Boolean(dragSession.value && canDropInto(containerName))
  }

  function applyDrop(containerName: string, index?: number) {
    const designer = context.designer.value

    if (dragSession.value?.type === 'material' && draggedMaterialName.value) {
      const schema = designer.createNodeFromMaterial(draggedMaterialName.value)
      designer.insertNode(schema, {
        parentId: currentNode.value.id,
        container: containerName,
        index,
      })
      return true
    }

    if (dragSession.value?.type === 'node' && draggedNodeId.value) {
      designer.moveNode(draggedNodeId.value, {
        parentId: currentNode.value.id,
        container: containerName,
        index,
      })
      return true
    }

    return false
  }

  function resetDropState() {
    activeContainerName.value = undefined
    activeInsertionKey.value = undefined
    clearDragSession()
  }

  function setActiveContainer(containerName?: string) {
    activeContainerName.value = containerName
    if (!containerName)
      return

    if (activeInsertionKey.value?.startsWith(`${containerName}:`))
      activeInsertionKey.value = undefined
  }

  function setActiveInsertion(containerName: string, index: number) {
    activeContainerName.value = undefined
    activeInsertionKey.value = getInsertionKey(containerName, index)
  }

  function clearActiveInsertion(containerName: string, index: number) {
    if (activeInsertionKey.value === getInsertionKey(containerName, index))
      activeInsertionKey.value = undefined
  }

  function insertMaterial(materialName: string, containerName: string, index?: number) {
    const designer = context.designer.value
    const schema = designer.createNodeFromMaterial(materialName)
    designer.insertNode(schema, {
      parentId: currentNode.value.id,
      container: containerName,
      index,
    })
    activeContainerName.value = undefined
    activeInsertionKey.value = undefined
    clearDragSession()
  }

  function handleNodeDragStart(event: DragEvent) {
    if (!canDragNode.value)
      return

    startNodeDrag(currentNode.value.id, currentNode.value.componentName)
    event.dataTransfer?.setData('text/plain', currentNode.value.id)
    if (event.dataTransfer)
      event.dataTransfer.effectAllowed = 'move'
  }

  function handleNodeDragEnd() {
    clearDragSession()
  }

  function getNodeClasses() {
    return {
      'is-selected': isSelected.value,
      'is-hovered': isHovered.value,
      'is-dragging': isDraggingSelf.value,
    }
  }

  function getHandleClasses() {
    return {
      'is-selected': isSelected.value,
      'is-hovered': isHovered.value,
      'is-draggable': canDragNode.value,
      'is-dragging': isDraggingSelf.value,
    }
  }

  function getContainerClasses(containerName: string) {
    return {
      'is-drop-target': activeContainerName.value === containerName && canDropInto(containerName),
      'is-hovered': isHovered.value,
    }
  }

  function getInsertionClasses(containerName: string, index: number) {
    return {
      'is-active': activeInsertionKey.value === getInsertionKey(containerName, index),
    }
  }

  function handleContainerDragEnter(event: DragEvent, containerName: string) {
    if (!canDropInto(containerName))
      return

    event.preventDefault()
    event.stopPropagation()
    activeContainerName.value = containerName
  }

  function handleContainerDragOver(event: DragEvent, containerName: string) {
    if (!canDropInto(containerName))
      return

    event.preventDefault()
    event.stopPropagation()
    if (event.dataTransfer)
      event.dataTransfer.dropEffect = dragSession.value?.type === 'node' ? 'move' : 'copy'
    activeContainerName.value = containerName
  }

  function handleContainerDragLeave(event: DragEvent, containerName: string) {
    const nextTarget = event.relatedTarget
    if (nextTarget instanceof Node && event.currentTarget instanceof HTMLElement && event.currentTarget.contains(nextTarget))
      return

    if (activeContainerName.value === containerName)
      activeContainerName.value = undefined

    if (activeInsertionKey.value?.startsWith(`${containerName}:`))
      activeInsertionKey.value = undefined
  }

  function handleContainerDrop(event: DragEvent, containerName: string) {
    if (!canDropInto(containerName))
      return

    event.preventDefault()
    event.stopPropagation()

    if (applyDrop(containerName))
      resetDropState()
  }

  function handleInsertionDragEnter(event: DragEvent, containerName: string, index: number) {
    if (!canDropInto(containerName))
      return

    event.preventDefault()
    event.stopPropagation()
    activeContainerName.value = undefined
    activeInsertionKey.value = getInsertionKey(containerName, index)
  }

  function handleInsertionDragOver(event: DragEvent, containerName: string, index: number) {
    if (!canDropInto(containerName))
      return

    event.preventDefault()
    event.stopPropagation()
    if (event.dataTransfer)
      event.dataTransfer.dropEffect = dragSession.value?.type === 'node' ? 'move' : 'copy'
    activeContainerName.value = undefined
    activeInsertionKey.value = getInsertionKey(containerName, index)
  }

  function handleInsertionDragLeave(event: DragEvent, containerName: string, index: number) {
    const nextTarget = event.relatedTarget
    if (nextTarget instanceof Node && event.currentTarget instanceof HTMLElement && event.currentTarget.contains(nextTarget))
      return

    if (activeInsertionKey.value === getInsertionKey(containerName, index))
      activeInsertionKey.value = undefined
  }

  function handleInsertionDrop(event: DragEvent, containerName: string, index: number) {
    if (!canDropInto(containerName))
      return

    event.preventDefault()
    event.stopPropagation()

    if (applyDrop(containerName, index))
      resetDropState()
  }

  return {
    activeContainerName,
    activeInsertionKey,
    canDragNode,
    canDropInto,
    clearActiveInsertion,
    containerEntries,
    draggedMaterialName,
    draggedNodeId,
    handleContainerDragEnter,
    handleContainerDragLeave,
    handleContainerDragOver,
    handleContainerDrop,
    handleHoverEnter,
    handleHoverLeave,
    handleInsertionDragEnter,
    handleInsertionDragLeave,
    handleInsertionDragOver,
    handleInsertionDrop,
    handleNodeDragEnd,
    handleNodeDragStart,
    handleSelect,
    hasInsertionGuides,
    insertMaterial,
    isDraggingSelf,
    isHovered,
    isSelected,
    getInsertionKey,
    getNodeClasses,
    getHandleClasses,
    getContainerClasses,
    getInsertionClasses,
    setActiveContainer,
    setActiveInsertion,
  }
}
