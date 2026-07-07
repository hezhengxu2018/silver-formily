<script setup lang="ts">
import { createForm } from '@silver-formily/core'
import { transformToSchema } from '@silver-formily/designer-core'
import { reactiveComputed } from '@silver-formily/designer-vue'
import { Form as FormilyForm } from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'
import { computed, shallowRef, watch } from 'vue'
import { RuntimeComponents } from '../../renderer'
import { engine } from '../designer'

const { SchemaField } = createSchemaField({
  components: RuntimeComponents,
})

const formRef = shallowRef(createForm())
const schemaDocumentRef = reactiveComputed(() => {
  const tree = engine.getCurrentTree()
  if (!tree) {
    return {
      form: {},
      schema: {
        type: 'object',
        properties: {},
      },
    }
  }
  return transformToSchema(tree)
})

const schemaCode = computed(() => JSON.stringify(schemaDocumentRef.value, null, 2))

watch(schemaCode, () => {
  formRef.value = createForm()
})
</script>

<template>
  <aside class="epd-schema-preview">
    <div class="epd-schema-preview__runtime">
      <FormilyForm
        :key="schemaCode"
        :form="formRef"
        v-bind="schemaDocumentRef.form"
        preview-text-placeholder=" "
      >
        <SchemaField :key="schemaCode" :schema="schemaDocumentRef.schema" />
      </FormilyForm>
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
