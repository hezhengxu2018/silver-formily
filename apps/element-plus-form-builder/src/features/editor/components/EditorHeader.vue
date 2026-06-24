<script setup lang="ts">
import { Eye, Rocket, Save } from '@lucide/vue'
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
          <div :class="b('brand-row')">
            <h1 :class="b('title')">
              Element Plus Designable
            </h1>
          </div>
        </div>
      </div>

      <div :class="b('actions')">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline" size="sm" type="button" :class="b('action')">
              <Save />
              保存
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            静态占位符
          </TooltipContent>
        </Tooltip>
        <Button variant="outline" size="sm" type="button" :class="b('action')">
          <Eye />
          预览
        </Button>
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
  border-color: var(--editor-sidebar-divider);
  background: rgba(255, 255, 255, 0.95);

  &__inner {
    @apply flex h-[var(--editor-header-height)] flex-wrap items-center justify-between gap-3 px-4 lg:flex-nowrap lg:px-5;
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

  &__brand-row {
    @apply flex flex-wrap items-center gap-2;
  }

  &__title {
    @apply text-base font-semibold;
  }

  &__actions {
    @apply flex flex-wrap items-center gap-2;
  }

  &__action {
    @apply shrink-0;
  }
}
</style>
