import type { TreeNode } from '@silver-formily/designer-core'
import type { PropType, VNode } from 'vue'
import { defineComponent, Fragment, provide, toRef } from 'vue'
import { TreeNodeSymbol } from '../context'
import { useComponents, useDesigner } from '../hooks'
import { reactiveComputed } from '../shared/reactive'
import RuntimeNode from './RuntimeNode.vue'

const TreeNodeWidgetComponent = defineComponent({
  name: 'DnTreeNodeWidget',
  props: {
    node: Object as PropType<TreeNode>,
  },
  setup(props) {
    const designerRef = useDesigner(props.node?.designerProps?.effects)
    const componentsRef = useComponents()

    provide(TreeNodeSymbol, toRef(props, 'node') as any)

    const renderStateRef = reactiveComputed(() => {
      const node = props.node
      if (!node || node.hidden) {
        return {
          children: [] as TreeNode[],
          component: null as any,
          hidden: true,
          isFallback: false,
          mergedProps: {} as Record<string, unknown>,
          node,
          slotNodes: {} as Record<string, TreeNode[]>,
        }
      }

      const componentName = node.componentName
      const component = componentsRef.value?.[componentName] as any
      const nodeIdAttrName = designerRef.value?.props.nodeIdAttrName
      const dataId = nodeIdAttrName ? { [nodeIdAttrName]: node.id } : {}
      const mergedProps = {
        ...node.designerProps?.defaultProps,
        ...dataId,
        ...node.props,
        ...node.designerProps?.getComponentProps?.(node),
      } as Record<string, unknown>

      if (node.depth === 0)
        delete mergedProps.style

      if (node.designerProps?.selfRenderChildren) {
        return {
          children: [] as TreeNode[],
          component,
          hidden: false,
          isFallback: !component,
          mergedProps,
          node,
          slotNodes: {} as Record<string, TreeNode[]>,
        }
      }

      const children = node.children.filter((child) => {
        const slotName = child.props?.['x-slot']
        return !slotName || slotName === 'default'
      })

      const slotNodes = node.children.reduce<Record<string, TreeNode[]>>((buffer, child) => {
        const slotName = child.props?.['x-slot']
        if (!slotName)
          return buffer
        if (!buffer[slotName])
          buffer[slotName] = []
        buffer[slotName].push(child)
        return buffer
      }, {})

      return {
        children,
        component,
        hidden: false,
        isFallback: !component,
        mergedProps,
        node,
        slotNodes,
      }
    })

    return () => {
      const renderState = renderStateRef.value
      if (renderState.hidden)
        return null

      const slots = Object.entries(renderState.slotNodes).reduce<Record<string, () => VNode[]>>((buffer, [slotName, slotChildren]) => {
        buffer[slotName] = () => slotChildren.map(child => <TreeNodeWidgetComponent node={child} key={child.id} />)
        return buffer
      }, {})
      const children = renderState.children.map(child => <TreeNodeWidgetComponent node={child} key={child.id} />)

      if (renderState.isFallback) {
        return (
          <RuntimeNode node={renderState.node} {...renderState.mergedProps}>
            {children}
          </RuntimeNode>
        )
      }

      if (!renderState.component) {
        return children.length ? <Fragment>{children}</Fragment> : null
      }

      return (
        <renderState.component {...renderState.mergedProps} v-slots={slots}>
          {children}
        </renderState.component>
      )
    }
  },
})

export default TreeNodeWidgetComponent
