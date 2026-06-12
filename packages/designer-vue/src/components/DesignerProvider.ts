import type { DesignerProviderProps } from '../types'
import { computed, defineComponent, onBeforeUnmount, provide, shallowRef, toRef, watch } from 'vue'

import { DesignerContextSymbol } from '../types'

export default defineComponent({
  name: 'DesignerProvider',
  props: {
    designer: {
      type: Object as () => DesignerProviderProps['designer'],
      required: true,
    },
    previewComponents: {
      type: Object as () => DesignerProviderProps['previewComponents'],
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    const designer = shallowRef(props.designer)
    const version = shallowRef(0)
    let unsubscribe: (() => void) | undefined

    const bindDesigner = (nextDesigner: DesignerProviderProps['designer']) => {
      unsubscribe?.()
      designer.value = nextDesigner
      version.value++
      unsubscribe = nextDesigner.subscribe(() => {
        version.value++
      })
    }

    watch(toRef(props, 'designer'), (nextDesigner) => {
      bindDesigner(nextDesigner)
    }, {
      immediate: true,
    })

    onBeforeUnmount(() => {
      unsubscribe?.()
    })

    const snapshot = computed(() => {
      void version.value
      return designer.value.snapshot
    })

    const selectedNode = computed(() => {
      void version.value
      const selectedId = designer.value.selection.selectedId
      return selectedId ? designer.value.tree.getNode(selectedId) : undefined
    })

    const selectedParent = computed(() => {
      void version.value
      return selectedNode.value?.parent
    })

    const materialGroups = computed(() => {
      void version.value
      return designer.value.materials.groupByCategory()
    })

    const schemaText = computed(() => {
      void version.value
      return JSON.stringify(designer.value.exportSchema(), null, 2)
    })

    const canUndo = computed(() => {
      void version.value
      return designer.value.history.state.canUndo
    })

    const canRedo = computed(() => {
      void version.value
      return designer.value.history.state.canRedo
    })

    provide(DesignerContextSymbol, {
      designer,
      previewComponents: props.previewComponents || {},
      version,
      snapshot,
      selectedNode,
      selectedParent,
      materialGroups,
      schemaText,
      canUndo,
      canRedo,
    })

    return () => slots.default?.()
  },
})
