<script setup lang="ts">
import { createForm } from '@silver-formily/core'
import { DesignerWorkbench } from '@silver-formily/designer-vue'
import { Form, FormButtonGroup, FormItem, FormLayout, Input, Select, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'

import { designer, previewComponents } from './designer'
import { transformDesignerSchemaToFormilySchema } from './transformers/designerToFormily'

const version = ref(0)
const previewVersion = ref(0)
let unsubscribe: (() => void) | undefined

const previewForm = shallowRef(createForm())

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    FormLayout,
    Input,
    Select,
  },
})

onMounted(() => {
  unsubscribe = designer.subscribe(() => {
    version.value++
  })
})

onBeforeUnmount(() => {
  unsubscribe?.()
})

const designerSchema = computed(() => {
  void version.value
  return designer.exportSchema()
})

const runtimeSchema = computed(() => {
  void version.value
  return transformDesignerSchemaToFormilySchema(designerSchema.value)
})

const runtimeSchemaText = computed(() => {
  return JSON.stringify(runtimeSchema.value, null, 2)
})

watch(runtimeSchemaText, () => {
  previewVersion.value += 1
  previewForm.value = createForm()
}, {
  immediate: true,
})
</script>

<template>
  <main class="playground">
    <section class="playground__workspace">
      <DesignerWorkbench
        :designer="designer"
        :preview-components="previewComponents"
        title="Silver Formily Designer Playground"
      />
    </section>

    <aside class="playground__preview">
      <section class="preview-band">
        <header class="preview-band__header">
          <div>
            <p class="preview-band__eyebrow">
              Runtime Preview
            </p>
            <h2>Formily + Element Plus</h2>
          </div>
        </header>

        <div class="preview-band__surface">
          <FormProvider :key="previewVersion" :form="previewForm">
            <Form :form="previewForm" :label-width="112">
              <FormLayout layout="vertical">
                <SchemaField :key="previewVersion" :schema="runtimeSchema" />
              </FormLayout>
              <FormButtonGroup align-form-item>
                <Submit>Submit</Submit>
              </FormButtonGroup>
            </Form>
          </FormProvider>
        </div>
      </section>

      <section class="preview-band">
        <header class="preview-band__header">
          <div>
            <p class="preview-band__eyebrow">
              Generated Schema
            </p>
            <h2>Runtime JSON Schema</h2>
          </div>
        </header>
        <pre class="preview-band__code">{{ runtimeSchemaText }}</pre>
      </section>
    </aside>
  </main>
</template>

<style scoped>
.playground {
  min-height: 100vh;
  padding: 18px;
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) minmax(360px, 0.95fr);
  gap: 18px;
  background:
    linear-gradient(135deg, rgba(16, 185, 129, 0.06), transparent 26%),
    linear-gradient(180deg, #fbfaf6 0%, #efe7da 100%);
  color: #241b12;
  font-family: 'IBM Plex Sans', 'Avenir Next', 'Helvetica Neue', sans-serif;
}

.playground__workspace,
.playground__preview {
  min-height: 0;
}

.playground__preview {
  display: grid;
  gap: 18px;
  align-content: start;
}

.preview-band {
  display: grid;
  gap: 14px;
  padding: 16px;
  border: 1px solid rgba(73, 58, 38, 0.16);
  border-radius: 8px;
  background: rgba(255, 251, 246, 0.82);
  box-shadow: 0 16px 38px rgba(61, 42, 17, 0.08);
}

.preview-band__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.preview-band__eyebrow {
  margin: 0 0 4px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #7f6850;
}

.preview-band__header h2 {
  margin: 0;
  font-size: 18px;
  line-height: 1.15;
}

.preview-band__surface {
  padding: 16px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.88);
}

.preview-band__code {
  margin: 0;
  min-height: 260px;
  padding: 14px;
  overflow: auto;
  border-radius: 6px;
  background: #1f2024;
  color: #eff2f8;
  font-family: 'SFMono-Regular', 'SF Mono', Monaco, Consolas, monospace;
  font-size: 12px;
  line-height: 1.55;
}

@media (max-width: 1200px) {
  .playground {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .playground {
    padding: 10px;
    gap: 10px;
  }

  .preview-band {
    padding: 12px;
  }
}
</style>
