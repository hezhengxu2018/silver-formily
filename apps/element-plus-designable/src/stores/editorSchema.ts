import type { IFormilySchemaDocument } from '@silver-formily/designer-core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { shallowRef, watch } from 'vue'
import { setSchemaDocument as setDesignerSchemaDocument } from '@/features/editor/designer'

function createEmptySchemaDocument(): IFormilySchemaDocument {
  return {
    form: {},
    schema: {
      type: 'object',
      properties: {},
    },
  }
}

function cloneSchemaDocument(document: IFormilySchemaDocument): IFormilySchemaDocument {
  return JSON.parse(JSON.stringify(document)) as IFormilySchemaDocument
}

function isSameSchemaDocument(left: IFormilySchemaDocument, right: IFormilySchemaDocument) {
  return JSON.stringify(left) === JSON.stringify(right)
}

export const useEditorSchemaStore = defineStore('editorSchema', () => {
  const schemaDocument = shallowRef<IFormilySchemaDocument>(createEmptySchemaDocument())
  let syncingFromDesigner = false

  watch(
    schemaDocument,
    (document) => {
      if (syncingFromDesigner)
        return
      setDesignerSchemaDocument(document)
    },
    { flush: 'sync' },
  )

  function setSchemaDocument(document: IFormilySchemaDocument) {
    const nextDocument = cloneSchemaDocument(document)
    if (isSameSchemaDocument(schemaDocument.value, nextDocument))
      return
    schemaDocument.value = nextDocument
  }

  function syncFromDesigner(document: IFormilySchemaDocument) {
    const nextDocument = cloneSchemaDocument(document)
    if (isSameSchemaDocument(schemaDocument.value, nextDocument))
      return

    syncingFromDesigner = true
    try {
      schemaDocument.value = nextDocument
    }
    finally {
      syncingFromDesigner = false
    }
  }

  function clearSchemaDocument() {
    setSchemaDocument(createEmptySchemaDocument())
  }

  return {
    schemaDocument,
    clearSchemaDocument,
    setSchemaDocument,
    syncFromDesigner,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useEditorSchemaStore, import.meta.hot))
