<script setup lang="ts">
import { ClosestPosition } from '@silver-formily/designer-core'
import { useObserver } from '@silver-formily/reactive-vue'
import { useMoveHelper } from '../hooks'

useObserver()

const moveHelperRef = useMoveHelper()
const lineSize = 4
const halfLineSize = lineSize / 2

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
      left: `${closestRect.x - halfLineSize}px`,
      top: `${closestRect.y}px`,
      width: `${lineSize}px`,
    }
  }

  if (
    closestDirection === ClosestPosition.After
    || closestDirection === ClosestPosition.ForbidAfter
  ) {
    return {
      ...baseStyle,
      height: `${closestRect.height}px`,
      left: `${closestRect.x + closestRect.width - halfLineSize}px`,
      top: `${closestRect.y}px`,
      width: `${lineSize}px`,
    }
  }

  if (isAfterInsertion()) {
    if (isInlineLayout) {
      return {
        ...baseStyle,
        height: `${closestRect.height}px`,
        left: `${closestRect.x + closestRect.width - halfLineSize}px`,
        top: `${closestRect.y}px`,
        width: `${lineSize}px`,
      }
    }
    return {
      ...baseStyle,
      height: `${lineSize}px`,
      left: `${closestRect.x}px`,
      top: `${closestRect.y + closestRect.height - halfLineSize}px`,
      width: `${closestRect.width}px`,
    }
  }

  if (isBeforeInsertion()) {
    if (isInlineLayout) {
      return {
        ...baseStyle,
        height: `${closestRect.height}px`,
        left: `${closestRect.x - halfLineSize}px`,
        top: `${closestRect.y}px`,
        width: `${lineSize}px`,
      }
    }
    return {
      ...baseStyle,
      height: `${lineSize}px`,
      left: `${closestRect.x}px`,
      top: `${closestRect.y - halfLineSize}px`,
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
  pointer-events: none;
  position: absolute;
  z-index: 30;

  &__line {
    background-color: var(--silver-designer-color-primary, #2563eb);
    border-radius: 9999px;
    box-shadow: 0 0 0 3px
      var(
        --silver-designer-color-primary-shadow,
        color-mix(in oklab, var(--silver-designer-color-primary, #2563eb) 16%, transparent)
      );
    inset: 0;
    position: absolute;
  }

  &__handle {
    background-color: white;
    border-radius: 9999px;
    border-color: var(--silver-designer-color-primary-border, var(--silver-designer-color-primary, #2563eb));
    border-width: 2px;
    box-shadow: 0 0 0 3px
      var(
        --silver-designer-color-primary-shadow,
        color-mix(in oklab, var(--silver-designer-color-primary, #2563eb) 14%, transparent)
      );
    height: 8px;
    position: absolute;
    top: 50%;
    width: 8px;
    z-index: 1;
  }

  &__handle--start {
    left: 0;
    transform: translate(-50%, -50%);
  }

  &__handle--end {
    right: 0;
    transform: translate(50%, -50%);
  }

  &--vertical &__handle {
    left: 50%;
    top: auto;
  }

  &--vertical &__handle--start {
    top: 0;
    transform: translate(-50%, -50%);
  }

  &--vertical &__handle--end {
    bottom: 0;
    right: auto;
    transform: translate(-50%, 50%);
  }

  &--forbidden &__line {
    @apply bg-red-500;

    box-shadow: 0 0 0 3px rgb(239 68 68 / 14%);
  }

  &--forbidden &__handle {
    @apply border-red-500;

    box-shadow: 0 0 0 3px rgb(239 68 68 / 14%);
  }
}
</style>
