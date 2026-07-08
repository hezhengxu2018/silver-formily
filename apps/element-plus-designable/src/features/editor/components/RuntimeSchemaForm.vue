<script setup lang="ts">
import { createForm } from '@silver-formily/core'
import { createSchemaField } from '@silver-formily/vue'
import { storeToRefs } from 'pinia'
import { computed, shallowRef, watch } from 'vue'
import { useEditorSchemaStore } from '@/stores/editorSchema'
import { RuntimeComponents, RuntimeForm } from '../../renderer'

const { SchemaField } = createSchemaField({
  components: RuntimeComponents,
})

const formRef = shallowRef(createForm())
const editorSchemaStore = useEditorSchemaStore()
const { schemaDocument } = storeToRefs(editorSchemaStore)
const schemaKey = computed(() => JSON.stringify(schemaDocument.value))

watch(schemaKey, () => {
  formRef.value = createForm()
})
</script>

<template>
  <RuntimeForm
    :key="schemaKey"
    :form="formRef"
    v-bind="schemaDocument.form"
    preview-text-placeholder=" "
  >
    <SchemaField :key="schemaKey" :schema="schemaDocument.schema" />
  </RuntimeForm>
</template>
