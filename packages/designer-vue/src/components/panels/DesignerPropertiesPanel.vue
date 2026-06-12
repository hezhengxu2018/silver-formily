<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useDesigner } from '../../composables/useDesigner'
import './shared.css'

interface SetterDraft {
  name: string
  title: string
  component: string
  value: any
}

const context = useDesigner()

const nameValue = defineModel<string>('nameValue', { default: '' })
const titleValue = defineModel<string>('titleValue', { default: '' })
const propsValue = defineModel<string>('propsValue', { default: '{}' })
const schemaValue = defineModel<string>('schemaValue', { default: '{}' })
const message = defineModel<string>('message', { default: '' })
const setterDrafts = ref<SetterDraft[]>([])

const selectedMaterial = computed(() => {
  const node = context.selectedNode.value
  if (!node)
    return undefined
  return context.designer.value.materials.get(node.componentName)
})

function parseSetterValue(component: string, value: unknown) {
  if (component === 'BooleanSetter')
    return Boolean(value)
  if (component === 'ArraySetter')
    return JSON.stringify(Array.isArray(value) ? value : [], null, 2)
  return value == null ? '' : String(value)
}

function serializeSetterValue(draft: SetterDraft) {
  if (draft.component === 'BooleanSetter')
    return Boolean(draft.value)
  if (draft.component === 'ArraySetter')
    return JSON.parse(String(draft.value || '[]'))
  return draft.value === '' ? undefined : String(draft.value)
}

function syncPropsValue(nextProps: Record<string, any>) {
  propsValue.value = JSON.stringify(nextProps, null, 2)
}

watch(() => context.selectedNode.value, (node) => {
  const material = node ? context.designer.value.materials.get(node.componentName) : undefined
  const materialSetters = Array.isArray(material?.setters) ? material.setters : []

  nameValue.value = node?.metadata?.name || ''
  titleValue.value = node?.title || ''
  syncPropsValue(node?.props || {})
  setterDrafts.value = materialSetters.map((setter: any) => ({
    name: setter.name,
    title: material?.propsSchema?.[setter.name]?.title || setter.name,
    component: setter.component,
    value: parseSetterValue(setter.component, node?.props?.[setter.name]),
  }))
  message.value = ''
}, {
  immediate: true,
})

watch(() => context.schemaText.value, (value) => {
  schemaValue.value = value
}, {
  immediate: true,
})

watch(setterDrafts, (drafts) => {
  const node = context.selectedNode.value
  if (!node)
    return

  try {
    const parsedProps = JSON.parse(propsValue.value || '{}')
    const nextProps = { ...parsedProps }

    drafts.forEach((draft) => {
      const value = serializeSetterValue(draft)
      if (value === undefined)
        delete nextProps[draft.name]
      else
        nextProps[draft.name] = value
    })

    syncPropsValue(nextProps)
  }
  catch {
    // Keep the raw JSON intact if the user is mid-edit and it is temporarily invalid.
  }
}, {
  deep: true,
})

function applySelectedNodeChanges() {
  const node = context.selectedNode.value
  if (!node)
    return

  try {
    const parsedProps = JSON.parse(propsValue.value || '{}')
    context.designer.value.updateNode(node.id, {
      metadata: {
        ...node.metadata,
        name: nameValue.value || undefined,
      },
      title: titleValue.value || undefined,
      props: parsedProps,
    })
    message.value = 'Node changes applied.'
  }
  catch {
    message.value = 'Props JSON is invalid.'
  }
}

function importSchema() {
  try {
    const parsed = JSON.parse(schemaValue.value || '{}')
    context.designer.value.importSchema(parsed)
    message.value = 'Schema imported.'
  }
  catch {
    message.value = 'Schema JSON is invalid.'
  }
}

function resetSchemaText() {
  schemaValue.value = context.schemaText.value
  message.value = 'Schema text reset from current designer state.'
}
</script>

<template>
  <section class="sf-panel">
    <header class="sf-panel__header">
      <div>
        <h2 class="sf-panel__title">
          Properties
        </h2>
        <p class="sf-panel__meta">
          <template v-if="selectedMaterial">
            Editing {{ selectedMaterial.title }} plus whole-schema import and export
          </template>
          <template v-else>
            Selected node fields plus whole-schema import and export
          </template>
        </p>
      </div>
    </header>

    <template v-if="context.selectedNode.value">
      <label class="sf-label">
        <span>Field name</span>
        <input v-model="nameValue" data-testid="properties-name" class="sf-input" type="text">
      </label>

      <label class="sf-label">
        <span>Node title</span>
        <input v-model="titleValue" data-testid="properties-title" class="sf-input" type="text">
      </label>

      <template v-for="draft in setterDrafts" :key="draft.name">
        <label v-if="draft.component === 'BooleanSetter'" class="sf-checkbox">
          <input v-model="draft.value" :data-testid="`properties-setter-${draft.name}`" type="checkbox">
          <span>{{ draft.title }}</span>
        </label>

        <label v-else-if="draft.component === 'ArraySetter'" class="sf-label">
          <span>{{ draft.title }}</span>
          <textarea
            v-model="draft.value"
            :data-testid="`properties-setter-${draft.name}`"
            class="sf-textarea sf-textarea--compact"
            spellcheck="false"
          />
        </label>

        <label v-else class="sf-label">
          <span>{{ draft.title }}</span>
          <input
            v-model="draft.value"
            :data-testid="`properties-setter-${draft.name}`"
            class="sf-input"
            type="text"
          >
        </label>
      </template>

      <label class="sf-label">
        <span>Props JSON</span>
        <textarea v-model="propsValue" data-testid="properties-props" class="sf-textarea" spellcheck="false" />
      </label>

      <button data-testid="properties-apply" class="sf-button sf-button--accent" type="button" @click="applySelectedNodeChanges">
        Apply Node Changes
      </button>
    </template>

    <p v-else class="sf-panel__meta">
      Select a node from the tree or canvas to edit it.
    </p>

    <label class="sf-label">
      <span>Schema JSON</span>
      <textarea v-model="schemaValue" data-testid="properties-schema" class="sf-textarea" spellcheck="false" />
    </label>

    <div class="sf-properties__actions">
      <button data-testid="properties-reset-schema" class="sf-button" type="button" @click="resetSchemaText">
        Reset From State
      </button>
      <button data-testid="properties-import-schema" class="sf-button sf-button--accent" type="button" @click="importSchema">
        Import Schema
      </button>
    </div>

    <p v-if="message" class="sf-panel__meta">
      {{ message }}
    </p>
  </section>
</template>

<style scoped>
.sf-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: var(--sf-text-muted, #74624e);
}

.sf-checkbox input {
  margin: 0;
}

.sf-properties__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.sf-textarea--compact {
  min-height: 112px;
}
</style>
