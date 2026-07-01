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

function getSiblingLineRect() {
  const anchorRect = getActualClosestOffsetRect()
  const closestNode = getClosestNode()
  const activeViewport = getActiveViewport()
  if (!anchorRect || !closestNode || !activeViewport)
    return anchorRect

  if (isVerticalInsertion())
    return anchorRect

  const parentRect = closestNode.parent
    ? activeViewport.getValidNodeOffsetRect(closestNode.parent)
    : null

  if (!parentRect)
    return anchorRect

  return {
    ...anchorRect,
    width: parentRect.width,
    x: parentRect.x,
  }
}

function isVisible() {
  return !!getActualClosestOffsetRect() && !!getClosestDirection()
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
    || closestDirection === ClosestPosition.InnerBefore
    || closestDirection === ClosestPosition.InnerAfter
    || closestDirection === ClosestPosition.ForbidInner
    || closestDirection === ClosestPosition.ForbidInnerBefore
    || closestDirection === ClosestPosition.ForbidInnerAfter
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

  const siblingLineRect = getSiblingLineRect()
  if (!siblingLineRect)
    return {}

  const top = closestDirection === ClosestPosition.After
    || closestDirection === ClosestPosition.Under
    || closestDirection === ClosestPosition.InnerAfter
    || closestDirection === ClosestPosition.ForbidUnder
    || closestDirection === ClosestPosition.ForbidInnerAfter
    ? currentRect.y + currentRect.height
    : currentRect.y

  return {
    left: `${siblingLineRect.x - 4}px`,
    top: `${top}px`,
    width: `${siblingLineRect.width + 8}px`,
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
  @apply pointer-events-none absolute z-30 flex h-0 -translate-y-1/2 items-center;

  &__area {
    @apply absolute inset-0 rounded-lg border-2 border-blue-500 bg-blue-500/10 shadow-[0_0_0_3px_rgba(59,130,246,0.14)];
  }

  &__line {
    @apply h-1 flex-1 rounded-full bg-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.16)];
  }

  &__handle {
    @apply size-2 shrink-0 rounded-full border-2 border-blue-500 bg-white shadow-[0_0_0_3px_rgba(59,130,246,0.14)];
  }

  &--vertical {
    @apply h-auto w-0 -translate-x-1/2 translate-y-0 flex-col;
  }

  &--vertical &__line {
    @apply h-full w-1;
    min-height: 100%;
  }

  &--area {
    @apply translate-x-0 translate-y-0;
  }

  &--forbidden &__area {
    @apply border-red-500 bg-red-500/10 shadow-[0_0_0_3px_rgba(239,68,68,0.14)];
  }

  &--forbidden &__line {
    @apply bg-red-500 shadow-[0_0_0_3px_rgba(239,68,68,0.14)];
  }

  &--forbidden &__handle {
    @apply border-red-500 shadow-[0_0_0_3px_rgba(239,68,68,0.14)];
  }
}
</style>
