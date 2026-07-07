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

function getClosestLayout() {
  const moveHelper = moveHelperRef.value
  if (!moveHelper)
    return 'vertical'
  const viewport = moveHelper.activeViewport === moveHelper.outline
    ? moveHelper.outline
    : moveHelper.viewport
  return moveHelper.getClosestLayout(viewport)
}

function isAfterInsertion() {
  const closestDirection = getClosestDirection()
  return closestDirection === ClosestPosition.After
    || closestDirection === ClosestPosition.InnerAfter
    || closestDirection === ClosestPosition.Under
    || closestDirection === ClosestPosition.ForbidAfter
    || closestDirection === ClosestPosition.ForbidInnerAfter
    || closestDirection === ClosestPosition.ForbidUnder
}

function isBeforeInsertion() {
  const closestDirection = getClosestDirection()
  return closestDirection === ClosestPosition.Before
    || closestDirection === ClosestPosition.InnerBefore
    || closestDirection === ClosestPosition.Upper
    || closestDirection === ClosestPosition.ForbidBefore
    || closestDirection === ClosestPosition.ForbidInnerBefore
    || closestDirection === ClosestPosition.ForbidUpper
}

function isForbiddenInsertion() {
  return String(getClosestDirection() ?? '').includes('FORBID')
}

function getLineStyle() {
  const closestDirection = getClosestDirection()
  const closestRect = getClosestOffsetRect()
  const isInlineLayout = getClosestLayout() === 'horizontal'
  const baseStyle: Record<string, string> = {
    left: '0px',
    top: '0px',
  }

  if (!closestRect)
    return baseStyle

  if (
    closestDirection === ClosestPosition.Before
    || closestDirection === ClosestPosition.ForbidBefore
  ) {
    return {
      ...baseStyle,
      height: `${closestRect.height}px`,
      left: `${closestRect.x}px`,
      top: `${closestRect.y}px`,
      width: '0px',
    }
  }

  if (
    closestDirection === ClosestPosition.After
    || closestDirection === ClosestPosition.ForbidAfter
  ) {
    return {
      ...baseStyle,
      height: `${closestRect.height}px`,
      left: `${closestRect.x + closestRect.width}px`,
      top: `${closestRect.y}px`,
      width: '0px',
    }
  }

  if (isAfterInsertion()) {
    if (isInlineLayout) {
      return {
        ...baseStyle,
        height: `${closestRect.height}px`,
        left: `${closestRect.x + closestRect.width}px`,
        top: `${closestRect.y}px`,
        width: '0px',
      }
    }
    return {
      ...baseStyle,
      height: '0px',
      left: `${closestRect.x}px`,
      top: `${closestRect.y + closestRect.height}px`,
      width: `${closestRect.width}px`,
    }
  }

  if (isBeforeInsertion()) {
    if (isInlineLayout) {
      return {
        ...baseStyle,
        height: `${closestRect.height}px`,
        left: `${closestRect.x}px`,
        top: `${closestRect.y}px`,
        width: '0px',
      }
    }
    return {
      ...baseStyle,
      height: '0px',
      left: `${closestRect.x}px`,
      top: `${closestRect.y}px`,
      width: `${closestRect.width}px`,
    }
  }

  return baseStyle
}

function isVisible() {
  return !!getClosestOffsetRect()
    && (isAfterInsertion() || isBeforeInsertion())
}

function isVerticalLine() {
  const closestDirection = getClosestDirection()
  const isInlineLayout = getClosestLayout() === 'horizontal'
  if (
    closestDirection === ClosestPosition.Before
    || closestDirection === ClosestPosition.After
    || closestDirection === ClosestPosition.ForbidBefore
    || closestDirection === ClosestPosition.ForbidAfter
  ) {
    return true
  }
  return isInlineLayout && (isAfterInsertion() || isBeforeInsertion())
}
</script>

<template>
  <div
    v-if="isVisible()"
    class="dn-aux-insertion"
    :class="{
      'dn-aux-insertion--forbidden': isForbiddenInsertion(),
      'dn-aux-insertion--vertical': isVerticalLine(),
    }"
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
  align-items: center;
  display: flex;
  height: 0;
  pointer-events: none;
  position: absolute;
  transform: translateY(-50%);
  z-index: 30;

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
