<script setup lang="ts">
import { Eye, Rocket, Save } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
</script>

<template>
  <header class="editor-header">
    <div class="editor-header__inner">
      <div class="editor-header__brand">
        <img
          src="/formily-logo.svg"
          alt="Formily"
          class="editor-header__logo"
        >
        <div class="editor-header__brand-copy">
          <div class="editor-header__brand-row">
            <h1 class="editor-header__title">
              Element Plus Designable
            </h1>
          </div>
        </div>
      </div>

      <div class="editor-header__actions">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline" size="sm" type="button" class="editor-header__action">
              <Save />
              保存
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            静态占位符
          </TooltipContent>
        </Tooltip>
        <Button variant="outline" size="sm" type="button" class="editor-header__action">
          <Eye />
          预览
        </Button>
        <Button size="sm" type="button" class="editor-header__action">
          <Rocket />
          导出
        </Button>
      </div>
    </div>
  </header>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.editor-header {
  @apply fixed inset-x-0 top-0 z-40 border-b backdrop-blur;
  border-color: var(--editor-sidebar-divider);
  background: rgba(255, 255, 255, 0.95);
}

.editor-header__inner {
  @apply flex h-[var(--editor-header-height)] flex-wrap items-center justify-between gap-3 px-4 lg:flex-nowrap lg:px-5;
}

.editor-header__brand {
  @apply flex min-w-0 items-center gap-3;
}

.editor-header__logo {
  @apply h-auto w-36 max-w-[42vw] shrink-0 sm:w-30;
}

.editor-header__brand-copy {
  @apply min-w-0;
}

.editor-header__brand-row {
  @apply flex flex-wrap items-center gap-2;
}

.editor-header__title {
  @apply text-base font-semibold;
}

.editor-header__actions {
  @apply flex flex-wrap items-center gap-2;
}

.editor-header__action {
  @apply shrink-0;
}
</style>
