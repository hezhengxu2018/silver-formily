<script setup lang="ts">
import { Rocket, RotateCcw, Save } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { createNamespace } from '@/lib/utils'

const { prefixCls, b } = createNamespace('editor-header')
</script>

<template>
  <header :class="prefixCls">
    <div :class="b('inner')">
      <div :class="b('brand')">
        <img
          src="/formily-logo.svg"
          alt="Formily"
          :class="b('logo')"
        >
        <div :class="b('brand-copy')">
          <h1 :class="b('title')">
            Element Plus Designable
          </h1>
        </div>
      </div>

      <div :class="b('actions')">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline" size="sm" type="button" :class="b('action')">
              <RotateCcw />
              恢复
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            从 LocalStorage 中恢复上次保存的内容
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline" size="sm" type="button" :class="b('action')">
              <Save />
              保存
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            保存到 LocalStorage 中，刷新页面后仍然可以恢复
          </TooltipContent>
        </Tooltip>
        <Button size="sm" type="button" :class="b('action')">
          <Rocket />
          导出
        </Button>
      </div>
    </div>
  </header>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-editor-header {
  @apply fixed inset-x-0 top-0 z-40 border-b backdrop-blur;

  background: rgb(255 255 255 / 94%);
  border-color: var(--editor-sidebar-divider);

  &__inner {
    @apply flex h-(--editor-header-height) items-center justify-between gap-4 px-5;
  }

  &__brand {
    @apply flex min-w-0 items-center gap-3;
  }

  &__logo {
    @apply h-auto w-36 max-w-[42vw] shrink-0 sm:w-30;
  }

  &__brand-copy {
    @apply min-w-0;
  }

  &__title {
    @apply truncate text-xl;

    background: linear-gradient(90deg, #4d1db5 0%, var(--primary) 100%);
    background-clip: text;
    color: transparent;
    font-family:
      Orbitron,
      ui-sans-serif,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      sans-serif;
    font-weight: 500;
    letter-spacing: 0;
  }

  &__actions {
    @apply flex shrink-0 items-center gap-2;
  }

  &__action {
    @apply shrink-0;

    svg {
      @apply size-3.5;
    }
  }
}
</style>
