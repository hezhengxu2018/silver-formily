import type { DesignableComponent } from '../types'
import { createBehavior } from '@silver-formily/designer-core'
import { useComponents, useDesigner, useNode } from '@silver-formily/designer-vue'
import { FormItem } from '@silver-formily/element-plus'
import { defineComponent, h } from 'vue'
import { AllLocales } from '../locales'
import { AllSchemas } from '../schemas'
import { composeExport, resolveComponentPath } from '../shared'

const previewStyle = {
  pointerEvents: 'none',
  userSelect: 'none',
} as const

const wrapperStyle = {
  position: 'relative',
} as const

const maskStyle = {
  cursor: 'move',
  inset: 0,
  position: 'absolute',
  zIndex: 1,
} as const

function pickSchemaState(attrs: Record<string, any>) {
  return {
    description: attrs.description,
    required: attrs.required,
    title: attrs.title,
  }
}

const FieldPreview = defineComponent({
  name: 'DnField',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    const componentsRef = useComponents()
    const designerRef = useDesigner()
    const nodeRef = useNode()

    return () => {
      const props = attrs as Record<string, any>
      const componentName = props['x-component']
      const decoratorName = props['x-decorator'] || 'FormItem'
      const componentProps = {
        ...(props['x-component-props'] || {}),
      }
      const decoratorProps = {
        ...pickSchemaState(props),
        ...(props['x-decorator-props'] || {}),
      }
      const nodeIdAttrName = designerRef.value?.props.nodeIdAttrName
      if (nodeIdAttrName && nodeRef.value)
        componentProps[nodeIdAttrName] = nodeRef.value.id

      const component = resolveComponentPath(componentsRef.value, componentName)
      const decorator = resolveComponentPath(componentsRef.value, decoratorName) || FormItem
      const children = component
        ? () => h(component, componentProps, slots)
        : () => slots.default?.()

      const preview = decorator
        ? h(decorator, decoratorProps, children)
        : children()

      return h('div', {
        [nodeIdAttrName || 'data-designer-node-id']: nodeRef.value?.id,
        class: 'dn-designable-field',
        style: wrapperStyle,
      }, [
        h('div', {
          class: 'dn-designable-field__preview',
          style: previewStyle,
        }, [preview]),
        h('div', {
          [nodeIdAttrName || 'data-designer-node-id']: nodeRef.value?.id,
          'aria-hidden': 'true',
          'class': 'dn-designable-field__mask',
          'style': maskStyle,
        }),
      ])
    }
  },
})

export const Field = composeExport(FieldPreview, {
  Behavior: createBehavior({
    name: 'Field',
    selector: node => node.componentName === 'Field',
    designerProps: {
      droppable: false,
      propsSchema: AllSchemas.Field,
    },
    designerLocales: AllLocales.Field,
  }),
}) as DesignableComponent
