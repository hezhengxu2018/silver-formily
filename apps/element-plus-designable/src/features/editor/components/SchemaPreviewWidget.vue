<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useEditorSchemaStore } from '@/stores/editorSchema'
import RuntimeSchemaForm from './RuntimeSchemaForm.vue'

const editorSchemaStore = useEditorSchemaStore()
const { schemaDocument } = storeToRefs(editorSchemaStore)

const schemaCode = computed(() => JSON.stringify(schemaDocument.value, null, 2))
</script>

<template>
  <aside class="epd-schema-preview">
    <div class="epd-schema-preview__runtime">
      <RuntimeSchemaForm />
    </div>

    <pre class="epd-schema-preview__code">{{ schemaCode }}</pre>
  </aside>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-schema-preview {
  @apply border-slate-200 bg-white;

  border-left-width: 1px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  width: 384px;

  &__runtime {
    @apply border-slate-200 p-4;

    border-bottom-width: 1px;
    min-height: 288px;
    overflow: auto;

    :deep(.formily-element-plus-array-table) {
      min-width: 100%;
    }

    :deep(.formily-element-plus-array-table .el-table) {
      font-size: 12px;
    }

    :deep(.formily-element-plus-array-table .el-pagination) {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      justify-content: flex-start;
    }

    :deep(.formily-element-plus-array-table .formily-element-plus-array-base-addition) {
      align-items: center;
      background: #fff;
      border: 1px dashed var(--el-border-color);
      border-radius: 4px;
      display: inline-flex;
      justify-content: center;
      min-height: 32px;
      width: 100%;
    }

    :deep(.formily-element-plus-array-table .formily-element-plus-array-base-addition:hover) {
      background: var(--el-fill-color-light);
      border-color: var(--el-color-primary);
      color: var(--el-color-primary);
    }
  }

  &__code {
    @apply m-0 bg-slate-950 p-4 text-slate-100;

    flex: 1 1 0%;
    font-size: 12px;
    line-height: 20px;
    min-height: 0;
    overflow: auto;
  }
}
</style>
