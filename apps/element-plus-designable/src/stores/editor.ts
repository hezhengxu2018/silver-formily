import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'

export type EditorViewMode = 'editor' | 'preview' | 'code'

export const useEditorStore = defineStore('editor', () => {
  const viewMode = ref<EditorViewMode>('editor')
  const isLeftSidebarCollapsed = ref(false)
  const isRightSidebarCollapsed = ref(false)

  function setViewMode(mode: EditorViewMode) {
    viewMode.value = mode
  }

  function setLeftSidebarCollapsed(collapsed: boolean) {
    isLeftSidebarCollapsed.value = collapsed
  }

  function setRightSidebarCollapsed(collapsed: boolean) {
    isRightSidebarCollapsed.value = collapsed
  }

  function toggleLeftSidebar() {
    isLeftSidebarCollapsed.value = !isLeftSidebarCollapsed.value
  }

  function toggleRightSidebar() {
    isRightSidebarCollapsed.value = !isRightSidebarCollapsed.value
  }

  return {
    viewMode,
    isLeftSidebarCollapsed,
    isRightSidebarCollapsed,
    setViewMode,
    setLeftSidebarCollapsed,
    setRightSidebarCollapsed,
    toggleLeftSidebar,
    toggleRightSidebar,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useEditorStore, import.meta.hot))
