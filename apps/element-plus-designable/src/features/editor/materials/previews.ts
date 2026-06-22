import type { Component } from 'vue'
import { defineComponent, h } from 'vue'
import { elementPlusDesignerMaterials } from './materials'

function createPreviewComponent(title: string): Component {
  return defineComponent({
    name: `ElementPlusDesignable${title.replace(/\W+/g, '')}Preview`,
    inheritAttrs: false,
    setup(_, { attrs }) {
      return () => h('div', {
        class: 'epd-material-preview',
      }, [
        h('strong', title),
        attrs.placeholder
          ? h('span', { class: 'epd-material-preview__hint' }, String(attrs.placeholder))
          : null,
      ])
    },
  })
}

export const elementPlusPreviewComponents: Record<string, Component> = Object.fromEntries(
  elementPlusDesignerMaterials.map(material => [
    material.name,
    createPreviewComponent(material.title),
  ]),
)
