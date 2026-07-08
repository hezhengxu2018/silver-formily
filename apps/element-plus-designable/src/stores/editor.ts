import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'

export type EditorViewMode = 'editor' | 'preview' | 'code'

export const useEditorStore = defineStore('editor', () => {
  const viewMode = ref<EditorViewMode>('editor')
  const isLeftSidebarCollapsed = ref(false)

  function setViewMode(mode: EditorViewMode) {
    viewMode.value = mode
  }

  function setLeftSidebarCollapsed(collapsed: boolean) {
    isLeftSidebarCollapsed.value = collapsed
  }

  function toggleLeftSidebar() {
    isLeftSidebarCollapsed.value = !isLeftSidebarCollapsed.value
  }

  return {
    viewMode,
    isLeftSidebarCollapsed,
    setViewMode,
    setLeftSidebarCollapsed,
    toggleLeftSidebar,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useEditorStore, import.meta.hot))
