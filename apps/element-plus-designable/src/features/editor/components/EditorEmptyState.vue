<script setup lang="ts">
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { createNamespace } from '@/lib/utils'
import { officialEmptyAnimations } from './officialEmptyAnimations'

defineProps<{
  isDragOver?: boolean
}>()

const { prefixCls, b } = createNamespace('editor-empty-state')
</script>

<template>
  <div :class="prefixCls">
    <div :class="b('animations')">
      <!-- Safe: these SVG fragments are bundled constants copied from the MIT-licensed official designable project. -->
      <!-- eslint-disable vue/html-self-closing -->
      <svg
        :class="b('animation')"
        viewBox="0 0 1024 1024"
        aria-hidden="true"
        focusable="false"
        v-html="officialEmptyAnimations.dragLeftSource"
      ></svg>
      <svg
        :class="b('animation')"
        viewBox="0 0 1024 1024"
        aria-hidden="true"
        focusable="false"
        v-html="officialEmptyAnimations.batchDrag"
      ></svg>
      <!-- eslint-enable vue/html-self-closing -->
    </div>

    <div :class="b('hotkeys')">
      <div v-if="isDragOver">
        松开鼠标，将组件放入画布
      </div>
      <template v-else>
        <div>
          选择:
          <KbdGroup>
            <Kbd>⌘ + Click</Kbd>
            <Kbd>Shift + Click</Kbd>
            <Kbd>⌘ + A</Kbd>
          </KbdGroup>
        </div>
        <div>
          复制:
          <KbdGroup>
            <Kbd>⌘ + C</Kbd>
          </KbdGroup>
        </div>
        <div>
          粘贴:
          <KbdGroup>
            <Kbd>⌘ + V</Kbd>
          </KbdGroup>
        </div>
        <div>
          删除: <Kbd>Delete</Kbd>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-editor-empty-state {
  display: flex;
  flex-direction: column;
  max-width: min(42rem, calc(100% - 3rem));

  &__animations {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
  }

  &__animation {
    height: 15rem;
    width: 15rem;
  }

  &__hotkeys {
    @apply text-xs text-slate-400;

    line-height: 30px;
    text-align: center;
  }
}
</style>
