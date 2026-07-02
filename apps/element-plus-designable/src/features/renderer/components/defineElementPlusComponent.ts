import type { IDesignerLocales, ITreeNode } from '@silver-formily/designer-core'
import type { Component } from 'vue'
import type { DesignableComponent } from '../types'
import { createBehavior, createResource } from '@silver-formily/designer-core'
import { composeExport } from '../shared'

export interface ElementPlusResourceOptions {
  component: Component
  componentName: string
  defaultProps?: Record<string, any>
  description?: string
  icon?: string
  previewComponent?: Component
  title: string
  type?: string
}

function createFieldElement(options: ElementPlusResourceOptions): ITreeNode {
  return {
    componentName: 'Field',
    props: {
      'type': options.type ?? 'string',
      'title': options.title,
      'x-decorator': 'FormItem',
      'x-component': options.componentName,
      'x-component-props': options.defaultProps ?? {},
    },
  }
}

function createLocales(options: ElementPlusResourceOptions): IDesignerLocales {
  return {
    'zh-CN': {
      title: options.title,
    },
    'en-US': {
      title: options.title,
    },
  }
}

export function defineElementPlusComponent(options: ElementPlusResourceOptions): DesignableComponent {
  return composeExport(options.previewComponent ?? options.component, {
    Behavior: createBehavior({
      name: options.componentName,
      extends: ['Field'],
      selector: node => node.props?.['x-component'] === options.componentName,
      designerProps: {
        propsSchema: {
          type: 'object',
          properties: {},
        },
      },
      designerLocales: createLocales(options),
    }),
    Resource: createResource({
      title: {
        'zh-CN': options.title,
        'en-US': options.title,
      },
      description: options.description,
      icon: options.icon ?? options.componentName,
      elements: [createFieldElement(options)],
    }),
  })
}
