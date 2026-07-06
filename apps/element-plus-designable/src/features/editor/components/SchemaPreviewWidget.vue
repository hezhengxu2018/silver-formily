<script setup lang="ts">
import { createForm } from '@silver-formily/core'
import { transformToSchema } from '@silver-formily/designer-core'
import { reactiveComputed } from '@silver-formily/designer-vue'
import { Form as FormilyForm } from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'
import { computed, shallowRef } from 'vue'
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
</script>

<template>
  <aside class="epd-schema-preview">
    <div class="epd-schema-preview__runtime">
      <FormilyForm
        :form="formRef"
        v-bind="schemaDocumentRef.form"
        preview-text-placeholder=" "
      >
        <SchemaField :schema="schemaDocumentRef.schema" />
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
