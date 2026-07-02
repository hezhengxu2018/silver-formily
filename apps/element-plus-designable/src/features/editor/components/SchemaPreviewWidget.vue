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
  @apply flex h-full w-[24rem] shrink-0 flex-col border-l border-slate-200 bg-white;

  &__runtime {
    @apply min-h-[18rem] overflow-auto border-b border-slate-200 p-4;
  }

  &__code {
    @apply m-0 min-h-0 flex-1 overflow-auto bg-slate-950 p-4 text-xs leading-5 text-slate-100;
  }
}
</style>
