<script setup lang="ts">
import { ClosestPosition } from '@silver-formily/designer-core'
import { useObserver } from '@silver-formily/reactive-vue'
import { useMoveHelper } from '../hooks'

useObserver()

const moveHelperRef = useMoveHelper()

function getClosestDirection() {
  return moveHelperRef.value?.closestDirection ?? null
}

function getClosestOffsetRect() {
  const moveHelper = moveHelperRef.value
  if (!moveHelper)
    return null
  return moveHelper.activeViewport === moveHelper.outline
    ? moveHelper.outlineClosestOffsetRect
    : moveHelper.viewportClosestOffsetRect
}

function isVisible() {
  return !!getClosestOffsetRect() && !!getClosestDirection()
}

function isVerticalInsertion() {
  const closestDirection = getClosestDirection()
  return closestDirection === ClosestPosition.Before
    || closestDirection === ClosestPosition.After
    || closestDirection === ClosestPosition.ForbidBefore
    || closestDirection === ClosestPosition.ForbidAfter
}

function getLineStyle() {
  const currentRect = getClosestOffsetRect()
  const closestDirection = getClosestDirection()
  if (!currentRect)
    return {}

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
    :class="{ 'dn-aux-insertion--vertical': isVerticalInsertion() }"
    :style="getLineStyle()"
  >
    <span class="dn-aux-insertion__handle dn-aux-insertion__handle--start" />
    <span class="dn-aux-insertion__line" />
    <span class="dn-aux-insertion__handle dn-aux-insertion__handle--end" />
  </div>
</template>

<style scoped>
@reference "../styles/globals.css";

.dn-aux-insertion {
  @apply pointer-events-none absolute z-30 flex h-0 -translate-y-1/2 items-center;

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
}
</style>
