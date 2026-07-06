<script setup lang="ts">
import { ClosestPosition } from '@silver-formily/designer-core'
import { useObserver } from '@silver-formily/reactive-vue'
import { useMoveHelper } from '../hooks'

useObserver()

const moveHelperRef = useMoveHelper()

function getClosestDirection() {
  return moveHelperRef.value?.closestDirection ?? null
}

function getClosestNode() {
  return moveHelperRef.value?.closestNode ?? null
}

function getClosestOffsetRect() {
  const moveHelper = moveHelperRef.value
  if (!moveHelper)
    return null
  return moveHelper.activeViewport === moveHelper.outline
    ? moveHelper.outlineClosestOffsetRect
    : moveHelper.viewportClosestOffsetRect
}

function getActiveViewport() {
  const moveHelper = moveHelperRef.value
  if (!moveHelper)
    return null
  return moveHelper.activeViewport === moveHelper.outline
    ? moveHelper.outline
    : moveHelper.viewport
}

function getActualClosestOffsetRect() {
  const anchorRect = getClosestOffsetRect()
  const closestNode = getClosestNode()
  const activeViewport = getActiveViewport()
  if (!anchorRect || !closestNode || !activeViewport)
    return anchorRect

  if (closestNode.isRoot && isInnerInsertion())
    return activeViewport.getElementOffsetRectById(closestNode.id) ?? anchorRect

  return anchorRect
}

function isVisible() {
  const closestDirection = getClosestDirection()
  return !!getActualClosestOffsetRect()
    && !!closestDirection
    && closestDirection !== ClosestPosition.Forbid
    && closestDirection !== ClosestPosition.ForbidInner
}

function isVerticalInsertion() {
  const closestDirection = getClosestDirection()
  const closestNode = moveHelperRef.value?.closestNode
  const isInlineContainer = !!closestNode?.parent?.designerProps?.inlineChildrenLayout
  if (!isInlineContainer)
    return false

  return closestDirection === ClosestPosition.Before
    || closestDirection === ClosestPosition.After
    || closestDirection === ClosestPosition.ForbidBefore
    || closestDirection === ClosestPosition.ForbidAfter
}

function isInnerInsertion() {
  const closestDirection = getClosestDirection()
  return closestDirection === ClosestPosition.Inner
}

function isForbiddenInsertion() {
  const closestDirection = getClosestDirection()
  return closestDirection === ClosestPosition.Forbid
    || closestDirection === ClosestPosition.ForbidBefore
    || closestDirection === ClosestPosition.ForbidAfter
    || closestDirection === ClosestPosition.ForbidUpper
    || closestDirection === ClosestPosition.ForbidUnder
    || closestDirection === ClosestPosition.ForbidInner
    || closestDirection === ClosestPosition.ForbidInnerBefore
    || closestDirection === ClosestPosition.ForbidInnerAfter
}

function getLineStyle() {
  const currentRect = getActualClosestOffsetRect()
  const closestDirection = getClosestDirection()
  if (!currentRect)
    return {}

  if (isInnerInsertion()) {
    return {
      height: `${currentRect.height}px`,
      left: `${currentRect.x}px`,
      top: `${currentRect.y}px`,
      width: `${currentRect.width}px`,
    }
  }

  if (isVerticalInsertion()) {
    const left = closestDirection === ClosestPosition.After || closestDirection === ClosestPosition.ForbidAfter
      ? currentRect.x + currentRect.width
      : currentRect.x

    return {
      height: `${currentRect.height + 8}px`,
      left: `${left}px`,
      top: `${currentRect.y - 4}px`,
      width: '0px',
    }
  }

  if (!currentRect)
    return {}

  const top = closestDirection === ClosestPosition.After
    || closestDirection === ClosestPosition.Under
    || closestDirection === ClosestPosition.InnerAfter
    || closestDirection === ClosestPosition.ForbidUnder
    || closestDirection === ClosestPosition.ForbidInnerAfter
    ? currentRect.y + currentRect.height
    : currentRect.y

  return {
    left: `${currentRect.x - 4}px`,
    top: `${top}px`,
    width: `${currentRect.width + 8}px`,
  }
}
</script>

<template>
  <div
    v-if="isVisible()"
    class="dn-aux-insertion"
    :class="{
      'dn-aux-insertion--area': isInnerInsertion(),
      'dn-aux-insertion--forbidden': isForbiddenInsertion(),
      'dn-aux-insertion--vertical': isVerticalInsertion(),
    }"
    :style="getLineStyle()"
  >
    <template v-if="isInnerInsertion()">
      <span class="dn-aux-insertion__area" />
    </template>
    <template v-else>
      <span class="dn-aux-insertion__handle dn-aux-insertion__handle--start" />
      <span class="dn-aux-insertion__line" />
      <span class="dn-aux-insertion__handle dn-aux-insertion__handle--end" />
    </template>
  </div>
</template>

<style scoped>
@reference "../styles/globals.css";

.dn-aux-insertion {
  align-items: center;
  display: flex;
  height: 0;
  pointer-events: none;
  position: absolute;
  transform: translateY(-50%);
  z-index: 30;

  &__area {
    @apply border-blue-500 bg-blue-500/10;
    border-radius: 8px;
    border-width: 2px;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.14);
    inset: 0;
    position: absolute;
  }

  &__line {
    @apply bg-blue-500;
    border-radius: 9999px;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.16);
    flex: 1 1 0%;
    height: 4px;
  }

  &__handle {
    @apply border-blue-500 bg-white;
    border-radius: 9999px;
    border-width: 2px;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.14);
    flex-shrink: 0;
    height: 8px;
    width: 8px;
  }

  &--vertical {
    flex-direction: column;
    height: auto;
    transform: translateX(-50%) translateY(0);
    width: 0;
  }

  &--vertical &__line {
    height: 100%;
    min-height: 100%;
    width: 4px;
  }

  &--area {
    transform: translateX(0) translateY(0);
  }

  &--forbidden &__area {
    @apply border-red-500 bg-red-500/10;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.14);
  }

  &--forbidden &__line {
    @apply bg-red-500;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.14);
  }

  &--forbidden &__handle {
    @apply border-red-500;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.14);
  }
}
</style>
