<script setup lang="ts">
import { Check, Copy } from '@lucide/vue'
import { storeToRefs } from 'pinia'
import { codeToHtml } from 'shiki'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { createNamespace } from '@/lib/utils'
import { useEditorSchemaStore } from '@/stores/editorSchema'

const editorSchemaStore = useEditorSchemaStore()
const { schemaDocument } = storeToRefs(editorSchemaStore)
const { prefixCls: codeViewportCls } = createNamespace('code-viewport')
const { prefixCls: codePanelCls, b: codePanelB } = createNamespace('code-panel')

const schemaCode = computed(() => JSON.stringify(schemaDocument.value, null, 2))
const highlightedSchemaCode = ref('')
const isCopied = ref(false)
const copyButtonLabel = computed(() => isCopied.value ? 'Copied' : 'Copy code')

let highlightVersion = 0
let copyResetTimer: ReturnType<typeof setTimeout> | undefined

watch(
  schemaCode,
  async (code) => {
    const version = ++highlightVersion
    const html = await codeToHtml(code, {
      lang: 'json',
      theme: 'github-dark',
    })

    if (version === highlightVersion) {
      highlightedSchemaCode.value = html
    }
  },
  { immediate: true },
)

async function copySchemaCode() {
  await writeClipboardText(schemaCode.value)

  isCopied.value = true

  if (copyResetTimer) {
    clearTimeout(copyResetTimer)
  }

  copyResetTimer = setTimeout(() => {
    isCopied.value = false
  }, 1500)
}

onBeforeUnmount(() => {
  if (copyResetTimer) {
    clearTimeout(copyResetTimer)
  }
})

async function writeClipboardText(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return
    }
    catch {
      // Fall through to the textarea fallback for preview environments without clipboard permission.
    }
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.top = '-9999px'

  document.body.append(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
}
</script>

<template>
  <div :class="codeViewportCls">
    <div :class="codePanelCls">
      <button
        :class="codePanelB('copy')"
        type="button"
        :aria-label="copyButtonLabel"
        :title="copyButtonLabel"
        @click="copySchemaCode"
      >
        <Check
          v-if="isCopied"
          aria-hidden="true"
          :size="14"
          :stroke-width="2"
        />
        <Copy
          v-else
          aria-hidden="true"
          :size="14"
          :stroke-width="2"
        />
      </button>
      <div :class="codePanelB('code')" v-html="highlightedSchemaCode" />
    </div>
  </div>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-code-viewport {
  @apply absolute inset-0 mx-auto flex w-full flex-col items-center overflow-y-auto px-16 transition-all duration-300;
}

.epd-code-panel {
  @apply relative mx-auto my-8 flex min-h-0 w-full overflow-hidden rounded-lg bg-white text-slate-900 transition-all duration-150;

  box-shadow: 0 0 20px 0 rgb(0 0 0 / 8%);
  max-width: calc(720px + 5rem);

  &__copy {
    @apply absolute right-3 top-3 z-10 inline-flex size-8 items-center justify-center rounded-md border border-slate-700 bg-slate-900/90 text-slate-300 opacity-0 shadow-sm transition hover:border-slate-500 hover:bg-slate-800 hover:text-white focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400;
  }

  &:hover &__copy,
  &:focus-within &__copy {
    @apply opacity-100;
  }

  &__code {
    @apply min-h-120 w-full overflow-auto bg-slate-950 text-slate-100;

    --epd-code-line-height: 12px;

    counter-reset: schema-code-line;
    font-size: 12px;
    line-height: var(--epd-code-line-height);

    :deep(.shiki) {
      @apply m-0 min-h-120 bg-transparent py-5;
    }

    :deep(.shiki code) {
      @apply block min-w-max;
    }

    :deep(.line) {
      @apply relative block pr-5;

      counter-increment: schema-code-line;
      min-height: var(--epd-code-line-height);
      padding-left: 4.5rem;
    }

    :deep(.line::before) {
      @apply absolute left-0 select-none text-right text-slate-500;

      content: counter(schema-code-line);
      width: 3rem;
    }
  }
}
</style>
